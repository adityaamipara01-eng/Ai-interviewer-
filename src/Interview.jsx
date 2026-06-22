import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { fetchQuestion, evaluateAnswer } from './api';
import { useNavigate } from 'react-router-dom';

export default function Interview() {
  const TOTAL_QUESTIONS = 5;
  const ACCEPT_TIME = 60;
  const ANSWER_TIME = 120;

  const [difficulty, setDifficulty] = useState(sessionStorage.getItem('selectedDifficulty') || 'Medium');
  const [askedQuestions, setAskedQuestions] = useState([]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState('Loading question...');
  const [status, setStatus] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerMode, setAnswerMode] = useState('write');
  const [isRecording, setIsRecording] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);

  const [speakEnabled, setSpeakEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingField, setSpeakingField] = useState(null);

  const [acceptTimer, setAcceptTimer] = useState(ACCEPT_TIME);
  const [answerTimer, setAnswerTimer] = useState(ANSWER_TIME);
  const [isAccepted, setIsAccepted] = useState(false);

  const acceptIntervalRef = useRef(null);
  const answerIntervalRef = useRef(null);
  const recognitionRef = useRef(null);
  const questionRef = useRef('');   // always holds the latest loaded question text
  const navigate = useNavigate();

  // Clear transcript at the very start of a new interview session
  useEffect(() => {
    localStorage.removeItem('transcript');
  }, []);


  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const [questionLoading, setQuestionLoading] = useState(true);

  useEffect(() => {
    if (questionIndex >= TOTAL_QUESTIONS) return;
    setQuestionLoading(true);
    setStatus('Generating question…');
    const role = sessionStorage.getItem('selectedRole') || 'General';
    fetchQuestion(role, difficulty, askedQuestions)
      .then(q => {
        const text = q && q.trim() !== '' ? q : `Question ${questionIndex + 1}`;
        setQuestion(text);
        questionRef.current = text;
        setStatus('');
        setQuestionLoading(false);
      })
      .catch(() => {
        const text = `Question ${questionIndex + 1}`;
        setQuestion(text);
        questionRef.current = text;
        setStatus('');
        setQuestionLoading(false);
      });
    setIsAccepted(false);
    setAcceptTimer(ACCEPT_TIME);
    setAnswer('');
    setEvaluation(null);
  }, [questionIndex]);


  useEffect(() => {
    if (isAccepted) return;
    acceptIntervalRef.current = setInterval(() => {
      setAcceptTimer(prev => {
        if (prev <= 1) {
          clearInterval(acceptIntervalRef.current);
          handleSkip();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(acceptIntervalRef.current);
  }, [isAccepted, questionIndex]);

  useEffect(() => {
    if (!isAccepted) return;
    answerIntervalRef.current = setInterval(() => {
      setAnswerTimer(prev => {
        if (prev <= 1) {
          clearInterval(answerIntervalRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(answerIntervalRef.current);
  }, [isAccepted]);

  const handleAccept = () => {
    clearInterval(acceptIntervalRef.current);
    setIsAccepted(true);
    setAnswerTimer(ANSWER_TIME);
  };

  const handleSkip = async () => {
    // Don't allow skip while question is still loading
    if (questionLoading) return;
    clearInterval(acceptIntervalRef.current);
    // Always use the ref so we get the real question text (not 'Loading...')
    const currentQuestion = questionRef.current || question;
    const current = JSON.parse(localStorage.getItem('transcript') || '[]');
    const updated = [...current, {
      question: currentQuestion,
      answer: '',
      mode: answerMode,
      evaluation: null,
      timeTaken: 0,
      status: 'Skipped'
    }];
    localStorage.setItem('transcript', JSON.stringify(updated));

    const nextIndex = questionIndex + 1;
    if (nextIndex >= TOTAL_QUESTIONS) {
      setStatus('Interview complete!');
      const transcript = JSON.parse(localStorage.getItem('transcript') || '[]');
      const report = generateReport(transcript);
      const saved = await saveReport(report);
      const reportId = saved?.id || '';
      setTimeout(() => navigate(reportId ? `/report/${reportId}` : '/report'), 800);
    } else {
      setQuestionIndex(nextIndex);
    }
  };


  // ── Voice helpers ──────────────────────────────────────────────
  const speakText = (text, fieldKey) => {
    if (!window.speechSynthesis) return;
    if (speakingField === fieldKey) {
      window.speechSynthesis.cancel();
      setSpeakingField(null);
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.onstart = () => { setIsSpeaking(true); setSpeakingField(fieldKey); };
    utter.onend = () => { setIsSpeaking(false); setSpeakingField(null); };
    utter.onerror = () => { setIsSpeaking(false); setSpeakingField(null); };
    window.speechSynthesis.speak(utter);
  };

  const speakFeedback = (evalResult) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const statusMap = {
      Correct: 'Correct Answer.',
      'Partially Correct': 'Partially Correct.',
      Incorrect: 'Incorrect Answer.'
    };
    const parts = [statusMap[evalResult.correctness] || 'Result'];
    parts.push(`Score: ${evalResult.overallScore ?? evalResult.score ?? 0} out of 10.`);
    if (evalResult.correctPoints) parts.push(`Strengths: ${evalResult.correctPoints}`);
    if (evalResult.mistakes) parts.push(`Mistakes: ${evalResult.mistakes}`);
    if (evalResult.missingConcepts) parts.push(`Missing concepts: ${evalResult.missingConcepts}`);
    if (evalResult.improvementSuggestions) parts.push(`Improvement: ${evalResult.improvementSuggestions}`);
    if (evalResult.idealAnswer) parts.push(`Ideal answer: ${evalResult.idealAnswer}`);
    const utter = new SpeechSynthesisUtterance(parts.join(' '));
    utter.rate = 1.0;
    utter.onstart = () => { setIsSpeaking(true); setSpeakingField('full'); };
    utter.onend = () => { setIsSpeaking(false); setSpeakingField(null); };
    window.speechSynthesis.speak(utter);
  };

  const pauseFeedback = () => {
    if (window.speechSynthesis?.speaking) window.speechSynthesis.pause();
  };

  // ── Difficulty adaptation ─────────────────────────────────────
  const adjustDifficulty = (score) => {
    const levels = ['Easy', 'Medium', 'Hard'];
    let idx = levels.indexOf(difficulty);
    if (score >= 8 && idx < levels.length - 1) idx++;
    else if (score <= 4 && idx > 0) idx--;
    const newDiff = levels[idx];
    setDifficulty(newDiff);
    sessionStorage.setItem('selectedDifficulty', newDiff);
  };

  // ── Submit answer ─────────────────────────────────────────────
  const handleSubmit = async () => {
    clearInterval(answerIntervalRef.current);
    const elapsed = ANSWER_TIME - answerTimer;
    setTimeTaken(elapsed);
    setStatus('Evaluating answer…');
    const role = sessionStorage.getItem('selectedRole') || 'General';
    try {
      const evalResult = await evaluateAnswer({ role, difficulty, question, answer, previousQuestions: askedQuestions });
      setEvaluation(evalResult);
      setStatus('');
      adjustDifficulty(evalResult.overallScore ?? evalResult.score ?? 0);
      setAskedQuestions(prev => [...prev, question]);
      if (speakEnabled) speakFeedback(evalResult);
    } catch (e) {
      console.error('Evaluation error', e);
      setEvaluation({
        correctness: 'Incorrect',
        overallScore: 0,
        technicalScore: 0,
        communicationScore: 0,
        confidenceScore: 0,
        timeManagementScore: 0,
        correctPoints: '',
        mistakes: 'An error occurred while evaluating your answer.',
        missingConcepts: '',
        improvementSuggestions: 'Please try again.',
        idealAnswer: '',
        communicationFeedback: '',
        confidenceFeedback: '',
        timeManagementFeedback: ''
      });
      setStatus('');
    }
  };

  // ── Report + navigation ───────────────────────────────────────
  const generateReport = (transcript) => {
    const total = transcript.length;
    let overall = 0, technical = 0, communication = 0, confidence = 0, timeMgmt = 0;
    const strengths = [], weaknesses = [], missed = [];
    transcript.forEach(item => {
      const ev = item.evaluation || {};
      overall += ev.overallScore ?? ev.score ?? 0;
      technical += ev.technicalScore ?? ev.score ?? 0;
      communication += ev.communicationScore ?? 0;
      confidence += ev.confidenceScore ?? 0;
      timeMgmt += ev.timeManagementScore ?? 0;
      if (ev.correctPoints) strengths.push(ev.correctPoints);
      if (ev.mistakes) weaknesses.push(ev.mistakes);
      if (ev.missingConcepts) missed.push(ev.missingConcepts);
    });
    const avg = val => (total ? (val / total).toFixed(1) : 0);
    return {
      user_id: supabase.auth.user?.()?.id,
      overall_score: avg(overall),
      technical_score: avg(technical),
      communication_score: avg(communication),
      confidence_score: avg(confidence),
      time_management_score: avg(timeMgmt),
      strengths: strengths.join('\n'),
      weaknesses: weaknesses.join('\n'),
      missed_concepts: missed.join('\n'),
      created_at: new Date().toISOString(),
      transcript
    };
  };

  const saveReport = async (report) => {
    try {
      const { error, data } = await supabase.from('interview_reports').insert([report]);
      if (error) console.error('Error saving report:', error);
      return data?.[0] || null;
    } catch (e) {
      console.error('Exception saving report:', e);
      return null;
    }
  };

  const continueToNext = async () => {
    const current = JSON.parse(localStorage.getItem('transcript') || '[]');
    const updated = [...current, { question, answer, mode: answerMode, evaluation, timeTaken }];
    localStorage.setItem('transcript', JSON.stringify(updated));

    setEvaluation(null);

    if (questionIndex + 1 < TOTAL_QUESTIONS) {
      setQuestionIndex(prev => prev + 1);
      setStatus('');
    } else {
      setStatus('Interview complete!');
      const transcript = JSON.parse(localStorage.getItem('transcript') || '[]');
      const report = generateReport(transcript);
      const saved = await saveReport(report);
      const reportId = saved?.id || '';
      setTimeout(() => navigate(reportId ? `/report/${reportId}` : '/report'), 800);
    }
  };

  // ── Speech recognition ────────────────────────────────────────
  const toggleRecording = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition API');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      rec.onresult = e => {
        const t = Array.from(e.results).map(r => r[0].transcript).join('');
        setAnswer(t);
      };
      rec.onend = () => setIsRecording(false);
      recognitionRef.current = rec;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const speakQuestion = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(question));
  };

  // ── Evaluation panel ──────────────────────────────────────────
  const renderEvaluationPanel = () => {
    if (!evaluation) return null;
    const ev = evaluation;
    const correctness = ev.correctness;
    const statusConfig = {
      Correct: { icon: '✅', label: 'Correct Answer', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
      'Partially Correct': { icon: '⚠️', label: 'Partially Correct', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
      Incorrect: { icon: '❌', label: 'Incorrect Answer', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' }
    };
    const cfg = statusConfig[correctness] || statusConfig['Incorrect'];

    return (
      <div className="mt-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
            AI Interviewer Feedback
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => speakFeedback(ev)}
              className={`btn btn-sm ${speakingField === 'full' ? 'btn-warning' : 'btn-secondary'} cursor-pointer text-xs`}
              title="Read all feedback aloud"
            >
              {speakingField === 'full' ? '⏹️ Stop' : '🔊 Read All'}
            </button>
            <button
              className="btn btn-sm btn-secondary cursor-pointer text-xs"
              onClick={toggleSpeak}
            >
              {speakEnabled ? '🔇 Mute' : '🔊 Unmute'}
            </button>
          </div>
        </div>

        {/* Status badge */}
        <div className={`flex items-center gap-3 p-4 rounded-xl border mb-5 ${cfg.bg}`}>
          <span className="text-2xl">{cfg.icon}</span>
          <div>
            <span className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</span>
            <span className="ml-4 text-sm text-gray-400">
              Score: <strong className="text-[var(--accent-cyan)]">{ev.overallScore ?? ev.score ?? 0} / 10</strong>
            </span>
          </div>
        </div>

        {/* Scores row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-center text-xs">
          {[
            { label: 'Technical', val: ev.technicalScore ?? ev.score ?? 0, color: 'text-cyan-400' },
            { label: 'Communication', val: ev.communicationScore ?? 0, color: 'text-green-400' },
            { label: 'Confidence', val: ev.confidenceScore ?? 0, color: 'text-orange-400' },
            { label: 'Time Mgmt', val: ev.timeManagementScore ?? 0, color: 'text-violet-400' },
          ].map(s => (
            <div key={s.label} className="p-3 bg-white/3 rounded-lg border border-white/5">
              <span className="block text-gray-400 uppercase tracking-wider mb-1">{s.label}</span>
              <strong className={`text-base ${s.color}`}>{s.val}/10</strong>
            </div>
          ))}
        </div>

        {/* Feedback sections */}
        <div className="space-y-3 mb-5">
          {correctness === 'Correct' ? (
            ev.correctPoints && (
              <FeedbackBlock
                label="Strong Points"
                text={ev.correctPoints}
                color="text-green-400"
                bg="bg-green-950/20 border-green-500/20"
                icon="💪"
                onSpeak={() => speakText(ev.correctPoints, 'correctPoints')}
                isPlaying={speakingField === 'correctPoints'}
              />
            )
          ) : (
            <>
              {ev.mistakes && (
                <FeedbackBlock
                  label="Mistakes"
                  text={ev.mistakes}
                  color="text-red-400"
                  bg="bg-red-950/20 border-red-500/20"
                  icon="❌"
                  onSpeak={() => speakText(ev.mistakes, 'mistakes')}
                  isPlaying={speakingField === 'mistakes'}
                />
              )}
              {ev.missingConcepts && (
                <FeedbackBlock
                  label="Missing Concepts"
                  text={ev.missingConcepts}
                  color="text-amber-400"
                  bg="bg-amber-950/20 border-amber-500/20"
                  icon="🔍"
                  onSpeak={() => speakText(ev.missingConcepts, 'missingConcepts')}
                  isPlaying={speakingField === 'missingConcepts'}
                />
              )}
              {(ev.improvementSuggestions || ev.suggestedImprovements) && (
                <FeedbackBlock
                  label="Short Improvement Suggestion"
                  text={ev.improvementSuggestions || ev.suggestedImprovements}
                  color="text-violet-400"
                  bg="bg-violet-950/20 border-violet-500/20"
                  icon="💡"
                  onSpeak={() => speakText(ev.improvementSuggestions || ev.suggestedImprovements, 'improvement')}
                  isPlaying={speakingField === 'improvement'}
                />
              )}
            </>
          )}
          {ev.idealAnswer && (
            <FeedbackBlock
              label="Ideal Model Answer"
              text={ev.idealAnswer}
              color="text-emerald-400"
              bg="bg-emerald-950/20 border-emerald-500/20"
              icon="📘"
              onSpeak={() => speakText(ev.idealAnswer, 'idealAnswer')}
              isPlaying={speakingField === 'idealAnswer'}
            />
          )}
          {ev.communicationFeedback && (
            <FeedbackBlock
              label="Communication Style"
              text={ev.communicationFeedback}
              color="text-blue-400"
              bg="bg-blue-950/20 border-blue-500/20"
              icon="💬"
              onSpeak={() => speakText(ev.communicationFeedback, 'comm')}
              isPlaying={speakingField === 'comm'}
            />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
          <button
            className="btn btn-lg btn-success cursor-pointer flex-1 sm:flex-none"
            onClick={continueToNext}
          >
            {questionIndex + 1 >= TOTAL_QUESTIONS ? '📊 View Final Report' : '➡️ Next Question'}
          </button>
          <button
            className="btn btn-sm btn-outline cursor-pointer"
            onClick={() => speakFeedback(ev)}
            disabled={isSpeaking && speakingField !== 'full'}
          >
            🔄 Replay Feedback
          </button>
          {isSpeaking && (
            <button className="btn btn-sm btn-warning cursor-pointer" onClick={pauseFeedback}>
              ⏸️ Pause
            </button>
          )}
        </div>
      </div>
    );
  };

  const toggleSpeak = () => setSpeakEnabled(prev => !prev);

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center p-6 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
        AI Interview Coach
      </h1>

      <div className="w-full p-8 glass-card mb-6">
        {/* Question header */}
        <div className="flex justify-between items-center mb-4 border-b border-[var(--border)] pb-4">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Question {questionIndex + 1} of {TOTAL_QUESTIONS}
          </h2>
          <div className="flex gap-2 items-center">
            <span className="text-xs px-2 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              {difficulty}
            </span>
            <button
              onClick={speakQuestion}
              className="btn btn-sm btn-ghost text-xs cursor-pointer"
              title="Read question aloud"
            >
              🔊
            </button>
          </div>
        </div>

        <p className="text-lg mb-6 leading-relaxed question-highlight">
          {questionLoading ? (
            <span className="flex items-center gap-2 text-[var(--text-muted)] italic">
              <span className="inline-block w-4 h-4 border-2 border-[var(--accent-purple)] border-t-transparent rounded-full animate-spin" />
              Generating question…
            </span>
          ) : question}
        </p>

        {/* Accept / Skip bar */}
        {!isAccepted && !evaluation && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-white/3 p-4 rounded-[var(--radius-sm)] border border-[var(--border)]">
            <span className="font-mono text-sm text-[var(--text-secondary)]">
              Time to accept: <strong className="text-[var(--accent-purple)]">{acceptTimer}s</strong>
            </span>
            <div className="flex space-x-3 w-full sm:w-auto">
              <button
                onClick={handleAccept}
                disabled={questionLoading}
                className="btn btn-primary btn-sm flex-1 sm:flex-initial disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Accept Question
              </button>
              <button
                onClick={handleSkip}
                disabled={questionLoading}
                className="btn btn-outline btn-sm flex-1 sm:flex-initial disabled:opacity-40 disabled:cursor-not-allowed"
                title={questionLoading ? 'Wait for question to load' : 'Skip this question'}
              >
                {questionLoading ? 'Loading…' : 'Skip Question'}
              </button>
            </div>
          </div>
        )}

        {/* Answer input — shown when accepted and not yet evaluated */}
        {isAccepted && !evaluation && (
          <div className="animate-fade-in">
            <div className="flex space-x-6 mb-6 bg-white/2 p-3 rounded-lg border border-[var(--border)]">
              <label className="flex items-center cursor-pointer text-sm font-medium text-[var(--text-secondary)]">
                <input
                  type="radio"
                  name="mode"
                  value="write"
                  checked={answerMode === 'write'}
                  onChange={() => setAnswerMode('write')}
                  className="mr-2 accent-[var(--accent-purple)]"
                />
                Write Answer
              </label>
              <label className="flex items-center cursor-pointer text-sm font-medium text-[var(--text-secondary)]">
                <input
                  type="radio"
                  name="mode"
                  value="speak"
                  checked={answerMode === 'speak'}
                  onChange={() => setAnswerMode('speak')}
                  className="mr-2 accent-[var(--accent-purple)]"
                />
                Speak Answer
              </label>
            </div>

            <div className="font-mono text-sm mb-4 text-[var(--text-muted)]">
              Time remaining: <span className={answerTimer < 30 ? 'text-[var(--accent-red)] font-bold' : 'text-[var(--text-secondary)]'}>{answerTimer}s</span>
            </div>

            {answerMode === 'write' ? (
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={6}
                className="input-field resize-none"
                placeholder="Type your technical answer here..."
              />
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={toggleRecording}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-white transition ${isRecording ? 'bg-red-500 recording-pulse' : 'bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/80'}`}
                >
                  {isRecording ? (
                    <><span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />Stop Recording</>
                  ) : '🎙️ Start Voice Input'}
                </button>
                <div className="flex-1 w-full input-field min-h-[64px] bg-white/2 border border-[var(--border)] p-4 rounded-lg text-sm overflow-y-auto">
                  {answer || <span className="text-[var(--text-muted)] italic">Your spoken transcript will appear here in real-time...</span>}
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-[var(--text-muted)] text-right">
              {answerMode === 'write' && `${answer.length} / 2000 characters`}
            </div>

            <button
              onClick={handleSubmit}
              disabled={status.includes('Evaluating') || !answer.trim()}
              className="mt-6 w-full py-3 bg-[var(--accent-purple)] text-white font-bold rounded-lg hover:bg-[var(--accent-purple)]/80 transition disabled:opacity-50"
            >
              {status.includes('Evaluating') ? '⏳ Evaluating...' : 'Submit Answer'}
            </button>

            {status && (
              <p className="mt-4 text-center text-sm text-[var(--text-secondary)] bg-white/2 p-2 rounded border border-[var(--border)]">
                {status}
              </p>
            )}
          </div>
        )}

        {/* Evaluation panel — shown once evaluation is received */}
        {evaluation && renderEvaluationPanel()}
      </div>
    </div>
  );
}

// ── Reusable feedback block ───────────────────────────────────────
function FeedbackBlock({ label, text, color, bg, icon, onSpeak, isPlaying }) {
  return (
    <div className={`p-4 rounded-xl border ${bg}`}>
      <div className="flex justify-between items-center mb-2">
        <strong className={`text-sm font-semibold ${color} flex items-center gap-1.5`}>
          <span>{icon}</span> {label}
        </strong>
        <button
          onClick={onSpeak}
          className="btn btn-sm btn-ghost text-xs cursor-pointer border border-white/10 px-2 py-1 rounded-full"
          title={isPlaying ? 'Stop reading' : 'Read aloud'}
        >
          {isPlaying ? '⏹️' : '🔊'}
        </button>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

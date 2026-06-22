import { useEffect, useState } from 'react';
import { finalEvaluation } from './api';
import { useNavigate } from 'react-router-dom';

export default function Results() {
  const [transcript, setTranscript] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [status, setStatus] = useState('Loading results...');
  const [speakingIndex, setSpeakingIndex] = useState(null); // null, 'summary', or number
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('transcript') || '[]');
    setTranscript(stored);
    if (stored.length === 0) {
      setStatus('No transcript data found.');
      return;
    }
    setStatus('Evaluating...');
    finalEvaluation(stored)
      .then(evalRes => {
        setEvaluation(evalRes);
        setStatus('');
      })
      .catch(err => {
        console.error(err);
        setStatus('Evaluation failed.');
      });
  }, []);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const restartInterview = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    localStorage.removeItem('transcript');
    navigate('/');
  };

  const downloadTranscript = () => {
    const dataStr = JSON.stringify(transcript, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview_transcript.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const speakQuestionFeedback = (item, idx) => {
    if (!window.speechSynthesis) return;

    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    const parts = [];
    parts.push(`Question ${idx + 1}: ${item.question}`);
    parts.push(`Your Answer: ${item.answer || 'No answer provided'}`);
    parts.push(`Result: ${item.evaluation?.correctness || 'Unevaluated'}`);

    if (item.evaluation) {
      if (item.evaluation.correctness === 'Correct') {
        if (item.evaluation.correctPoints) {
          parts.push(`Strong Points: ${item.evaluation.correctPoints}`);
        }
      } else {
        if (item.evaluation.mistakes) {
          parts.push(`Mistakes: ${item.evaluation.mistakes}`);
        }
        if (item.evaluation.missingConcepts) {
          parts.push(`Missing Concepts: ${item.evaluation.missingConcepts}`);
        }
        if (item.evaluation.improvementSuggestions) {
          parts.push(`Improvement Suggestion: ${item.evaluation.improvementSuggestions}`);
        }
      }
    }

    const textToSpeak = parts.join('. ');
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    utter.onstart = () => setSpeakingIndex(idx);
    utter.onend = () => setSpeakingIndex(null);
    utter.onerror = () => setSpeakingIndex(null);
    window.speechSynthesis.speak(utter);
  };

  const speakSummary = () => {
    if (!window.speechSynthesis) return;

    if (speakingIndex === 'summary') {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    const correctCount = transcript.filter(i => i.evaluation?.correctness === 'Correct').length;
    const partialCount = transcript.filter(i => i.evaluation?.correctness === 'Partially Correct').length;
    const incorrectCount = transcript.filter(i => i.evaluation?.correctness === 'Incorrect').length;
    const skippedCount = transcript.filter(i => i.status === 'Skipped').length;

    const textToSpeak = `Interview Summary Totals. Total Correct Answers: ${correctCount}. Total Partially Correct Answers: ${partialCount}. Total Incorrect Answers: ${incorrectCount}. Total Skipped Questions: ${skippedCount}.`;
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    utter.onstart = () => setSpeakingIndex('summary');
    utter.onend = () => setSpeakingIndex(null);
    utter.onerror = () => setSpeakingIndex(null);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-4xl mx-auto min-h-screen pb-20">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent text-center">
        Interview Results &amp; Report
      </h1>
      
      {status && (
        <p className="mb-6 text-[var(--text-secondary)] bg-white/2 p-3 rounded-lg border border-[var(--border)] w-full text-center">
          {status}
        </p>
      )}

      {evaluation && (
        <div className="w-full p-8 glass-card mb-8 border border-white/10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-3">
            Overall AI Performance Report
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            <div className="p-4 bg-white/2 border border-white/5 rounded-xl text-center">
              <span className="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-semibold">Overall</span>
              <strong className="text-xl text-[var(--accent-purple)]">{evaluation.overallScore ?? evaluation.score ?? 0} / 10</strong>
            </div>
            <div className="p-4 bg-white/2 border border-white/5 rounded-xl text-center">
              <span className="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-semibold">Technical</span>
              <strong className="text-xl text-[var(--accent-cyan)]">{evaluation.technicalScore ?? evaluation.score ?? 0} / 10</strong>
            </div>
            <div className="p-4 bg-white/2 border border-white/5 rounded-xl text-center">
              <span className="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-semibold">Communication</span>
              <strong className="text-xl text-[var(--accent-green)]">{evaluation.communicationScore ?? 0} / 10</strong>
            </div>
            <div className="p-4 bg-white/2 border border-white/5 rounded-xl text-center">
              <span className="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-semibold">Confidence</span>
              <strong className="text-xl text-[var(--accent-orange)]">{evaluation.confidenceScore ?? 0} / 10</strong>
            </div>
            <div className="p-4 bg-white/2 border border-white/5 rounded-xl text-center">
              <span className="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-semibold">Time Mgmt</span>
              <strong className="text-xl text-[var(--accent-blue)]">{evaluation.timeManagementScore ?? 0} / 10</strong>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            <div>
              <strong className="text-white block mb-1 font-semibold">Strengths:</strong>
              <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">{evaluation.strengths}</p>
            </div>
            <div>
              <strong className="text-white block mb-1 font-semibold">Weaknesses / Recommendations:</strong>
              <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">{evaluation.weaknesses}</p>
            </div>
            <div>
              <strong className="text-white block mb-1 font-semibold">Suggested Learning Path &amp; Topics:</strong>
              <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">{evaluation.suggestedLearningTopics}</p>
            </div>
          </div>
        </div>
      )}

      {transcript.length > 0 && (
        <div className="w-full mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Question Breakdown Details
          </h2>
          <div className="space-y-8">
            {transcript.map((item, idx) => (
              <div key={idx} className="p-8 glass-card border border-white/10 rounded-2xl">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-600/30 text-indigo-300 text-xs px-2.5 py-1 rounded font-bold border border-indigo-500/20">
                      Q{idx + 1}
                    </span>
                    {item.status === 'Skipped' ? (
                      <span className="bg-gray-500/20 text-gray-300 text-xs px-2.5 py-1 rounded font-bold border border-gray-500/30">
                        ⏭️ Skipped
                      </span>
                    ) : (
                      <span className="bg-cyan-500/10 text-cyan-300 text-xs px-2.5 py-1 rounded font-bold border border-cyan-500/20">
                        Technical
                      </span>
                    )}
                  </div>
                  <div className="text-[var(--accent-cyan)] font-extrabold text-lg">
                    {item.status === 'Skipped' ? '—' : `${(item.evaluation?.overallScore ?? item.evaluation?.score ?? 0).toFixed(1)}/10`}
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-lg font-bold text-white mb-4 leading-relaxed">
                  "{item.question}"
                </h3>

                {/* Badges Row */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full font-medium border border-white/10 flex items-center gap-1.5">
                    ⏱️ {item.timeTaken ?? 0}s Taken
                  </span>
                  <span className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full font-medium border border-white/10 flex items-center gap-1.5">
                    Mode: {item.mode === 'speak' ? '🎤 Voice' : '⌨️ Text'}
                  </span>
                </div>

                {/* Metrics Breakdown */}
                <div className="bg-[#121218] p-4 rounded-xl border border-white/5 grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                  <div className="text-center p-2">
                    <span className="text-[10px] text-gray-400 block tracking-wider uppercase mb-1">Technical Accuracy</span>
                    <strong className="text-lg font-extrabold text-white">{item.evaluation?.technicalScore ?? item.evaluation?.score ?? 0}/10</strong>
                  </div>
                  <div className="text-center p-2">
                    <span className="text-[10px] text-gray-400 block tracking-wider uppercase mb-1">Communication Skills</span>
                    <strong className="text-lg font-extrabold text-white">{item.evaluation?.communicationScore ?? 0}/10</strong>
                  </div>
                  <div className="text-center p-2">
                    <span className="text-[10px] text-gray-400 block tracking-wider uppercase mb-1">Completeness</span>
                    <strong className="text-lg font-extrabold text-white">{item.evaluation?.overallScore ?? item.evaluation?.score ?? 0}/10</strong>
                  </div>
                  <div className="text-center p-2">
                    <span className="text-[10px] text-gray-400 block tracking-wider uppercase mb-1">Confidence Level</span>
                    <strong className="text-lg font-extrabold text-white">{item.evaluation?.confidenceScore ?? 0}/10</strong>
                  </div>
                  <div className="text-center p-2">
                    <span className="text-[10px] text-gray-400 block tracking-wider uppercase mb-1">Time Management</span>
                    <strong className="text-lg font-extrabold text-white">{item.evaluation?.timeManagementScore ?? 0}/10</strong>
                  </div>
                </div>

                {/* Your Answer */}
                {item.status === 'Skipped' ? (
                  <div className="mb-6 p-4 rounded-xl border border-gray-500/20 bg-gray-500/5 text-center">
                    <span className="text-gray-400 italic text-sm">⏭️ This question was skipped — no answer was provided.</span>
                  </div>
                ) : (
                  <div className="mb-6">
                    <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider mb-2">YOUR ANSWER</span>
                    <div className="bg-[#161622] p-4 rounded-xl border border-white/5 text-gray-300 italic text-sm">
                      "{item.answer || '(No answer provided)'}"
                    </div>
                  </div>
                )}

                {/* AI Evaluation Critique */}
                {item.status !== 'Skipped' && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">AI EVALUATION CRITIQUE</span>
                      <button 
                        onClick={() => speakQuestionFeedback(item, idx)} 
                        className="btn btn-sm btn-ghost gap-1 font-semibold text-xs border border-white/10 rounded-full px-3 py-1 flex items-center bg-white/5 hover:bg-white/10 transition-all text-indigo-300 cursor-pointer"
                      >
                        {speakingIndex === idx ? '⏹️ Stop Critique' : '🔊 Play Critique'}
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="font-semibold text-sm text-gray-200">Result Status:</span>
                        <span className="text-sm font-medium">
                          {item.evaluation?.correctness === 'Correct' ? '✅ Correct' : 
                           item.evaluation?.correctness === 'Partially Correct' ? '⚠️ Partially Correct' : '❌ Incorrect'}
                        </span>
                      </div>

                      {item.evaluation?.correctness === 'Correct' ? (
                        item.evaluation?.correctPoints && (
                          <div className="bg-green-950/10 border border-green-500/20 p-4 rounded-xl text-gray-300 text-sm">
                            <strong className="block text-green-400 mb-1 font-semibold">Strong Points</strong>
                            <p>{item.evaluation.correctPoints}</p>
                          </div>
                        )
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {item.evaluation?.mistakes && (
                            <div className="bg-red-950/10 border border-red-500/20 p-4 rounded-xl text-gray-300 text-sm">
                              <strong className="block text-red-400 mb-1 font-semibold">Mistakes</strong>
                              <p>{item.evaluation.mistakes}</p>
                            </div>
                          )}
                          {item.evaluation?.missingConcepts && (
                            <div className="bg-amber-950/10 border border-amber-500/20 p-4 rounded-xl text-gray-300 text-sm">
                              <strong className="block text-amber-400 mb-1 font-semibold">Missing Concepts</strong>
                              <p>{item.evaluation.missingConcepts}</p>
                            </div>
                          )}
                          {item.evaluation?.improvementSuggestions && (
                            <div className="bg-violet-950/10 border border-violet-500/20 p-4 rounded-xl text-gray-300 text-sm">
                              <strong className="block text-violet-400 mb-1 font-semibold">Short Improvement Suggestion</strong>
                              <p>{item.evaluation.improvementSuggestions}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recommended Model Answer */}
                {item.evaluation?.idealAnswer && (
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider mb-2">RECOMMENDED MODEL ANSWER</span>
                    <div className="bg-[#121b18] p-4 rounded-xl border border-emerald-500/10 text-emerald-300 text-sm leading-relaxed">
                      {item.evaluation.idealAnswer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Totals Card */}
      {transcript.length > 0 && (
        <div className="w-full p-8 glass-card mb-8 border border-white/10 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-white bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Summary Totals
            </h2>
            <button 
              onClick={speakSummary} 
              className="btn btn-sm btn-ghost gap-1 font-semibold text-xs border border-white/10 rounded-full px-3 py-1.5 flex items-center bg-white/5 hover:bg-white/10 transition-all text-indigo-300 cursor-pointer"
            >
              {speakingIndex === 'summary' ? '⏹️ Stop Summary' : '🔊 Play Summary'}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">✅ Correct</span>
              <strong className="text-2xl font-black text-green-400">
                {transcript.filter(i => i.evaluation?.correctness === 'Correct').length}
              </strong>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">⚠️ Partially Correct</span>
              <strong className="text-2xl font-black text-amber-400">
                {transcript.filter(i => i.evaluation?.correctness === 'Partially Correct').length}
              </strong>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">❌ Incorrect</span>
              <strong className="text-2xl font-black text-red-400">
                {transcript.filter(i => i.evaluation?.correctness === 'Incorrect').length}
              </strong>
            </div>
            <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-xl">
              <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">⏭️ Skipped</span>
              <strong className="text-2xl font-black text-gray-400">
                {transcript.filter(i => i.status === 'Skipped').length}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full justify-center mt-6">
        <button className="btn btn-primary btn-lg flex-1 max-w-[240px] cursor-pointer" onClick={downloadTranscript}>📥 Download JSON</button>
        <button className="btn btn-outline btn-lg flex-1 max-w-[240px] cursor-pointer" onClick={restartInterview}>🔄 Restart Interview</button>
      </div>
    </div>
  );
}

import React from 'react';

/**
 * EvaluationPanel
 * Renders the AI interviewer's feedback after an answer is evaluated.
 */
export default function EvaluationPanel({
  evaluation,
  onReplay,
  onPause,
  speakEnabled,
  toggleSpeak,
  onContinue,
  isSpeaking,
}) {
  const statusMap = {
    Correct: '✅ Correct Answer',
    'Partially Correct': '⚠️ Partially Correct',
    Incorrect: '❌ Incorrect Answer',
  };

  const correctness = evaluation.correctness;

  return (
    <div className="p-6 mt-6 glass-card border-[var(--accent-purple)]/30 rounded-2xl w-full">
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
        AI Interviewer Feedback
      </h3>

      {/* Status & Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white/2 border border-[var(--border)]">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block mb-1">Status</span>
          <span className="font-semibold text-lg">{statusMap[correctness] || correctness}</span>
        </div>
        <div className="p-4 rounded-lg bg-white/2 border border-[var(--border)]">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block mb-1">Technical Score</span>
          <span className="font-bold text-lg text-[var(--accent-cyan)]">{evaluation.overallScore ?? evaluation.score ?? 0} / 10</span>
        </div>
      </div>

      {/* Main Feedback Sections based on correctness */}
      <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
        {correctness === 'Correct' ? (
          evaluation.correctPoints && (
            <div>
              <strong className="text-[var(--accent-green)] block mb-1 font-semibold">Strong Points:</strong>
              <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">{evaluation.correctPoints}</p>
            </div>
          )
        ) : (
          <>
            {evaluation.mistakes && (
              <div>
                <strong className="text-[var(--accent-red)] block mb-1 font-semibold">Mistakes:</strong>
                <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">{evaluation.mistakes}</p>
              </div>
            )}
            {evaluation.missingConcepts && (
              <div>
                <strong className="text-[var(--accent-orange)] block mb-1 font-semibold">Missing Concepts:</strong>
                <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">{evaluation.missingConcepts}</p>
              </div>
            )}
            {(evaluation.improvementSuggestions || evaluation.suggestedImprovements) && (
              <div>
                <strong className="text-[var(--accent-purple)] block mb-1 font-semibold">Short Improvement Suggestion:</strong>
                <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">
                  {evaluation.improvementSuggestions || evaluation.suggestedImprovements}
                </p>
              </div>
            )}
          </>
        )}

        {/* Model Answer */}
        {evaluation.idealAnswer && (
          <div>
            <strong className="text-[var(--accent-blue)] block mb-1 font-semibold">Ideal Model Answer:</strong>
            <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)] text-xs font-mono whitespace-pre-wrap">
              {evaluation.idealAnswer}
            </p>
          </div>
        )}

        {/* Behavioral details if present */}
        {evaluation.communicationFeedback && (
          <div>
            <strong className="text-[var(--text-primary)] block mb-1 font-semibold">Communication Style:</strong>
            <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">
              {evaluation.communicationFeedback}
            </p>
          </div>
        )}
        {evaluation.confidenceFeedback && (
          <div>
            <strong className="text-[var(--text-primary)] block mb-1 font-semibold">Confidence Feedback:</strong>
            <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">
              {evaluation.confidenceFeedback}
            </p>
          </div>
        )}
        {evaluation.timeManagementFeedback && (
          <div>
            <strong className="text-[var(--text-primary)] block mb-1 font-semibold">Time Management Feedback:</strong>
            <p className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">
              {evaluation.timeManagementFeedback}
            </p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-6 border-t border-[var(--border)] pt-4">
        <button
          className="btn btn-lg btn-success cursor-pointer"
          onClick={() => {
            if (window.confirm('Are you sure you want to proceed to the next question?')) {
              onContinue();
            }
          }}
          disabled={isSpeaking}
        >
          Proceed to Next Question
        </button>
        <button
          className="btn btn-sm btn-primary cursor-pointer"
          onClick={onReplay}
          disabled={!speakEnabled || isSpeaking}
        >
          Replay Feedback
        </button>
        <button
          className="btn btn-sm btn-warning cursor-pointer"
          onClick={onPause}
          disabled={!isSpeaking}
        >
          Pause Feedback
        </button>
        <button className="btn btn-sm btn-secondary cursor-pointer" onClick={toggleSpeak}>
          {speakEnabled ? '🔇 Mute' : '🔊 Unmute'}
        </button>
      </div>
    </div>
  );
}

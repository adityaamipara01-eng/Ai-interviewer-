/* src/api.js
 * Helper functions to interact with Google Gemini API for interview flow.
 * If the Gemini API key is not configured, the functions fall back to static mock data.
 */

export async function generateQuestion(role, difficulty, previousQuestions = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isMock = !apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '';

  const prompt = `You are a senior technical interviewer.
Generate one realistic interview question for a ${role} position at ${difficulty} difficulty.
Requirements:
* Ask only one question.
* Do not provide the answer.
* Questions should match the selected difficulty level.
* Questions should be relevant to real company interviews.
* Return only the question.
* Do not repeat any of these previous questions: ${previousQuestions.join(' | ')}.`;

  if (isMock) {
    const fallback = {
      'Python Developer': [
        'What is the difference between a list and a tuple in Python?',
        'Explain list comprehensions with an example.',
        'What are Python decorators and where are they used?'
      ],
      'Frontend Developer': [
        'Explain the CSS box model and how it affects layout.',
        'What is the virtual DOM and why is it useful?',
        'How would you optimise page load performance?'
      ]
    }[role] || ['Describe a challenging technical problem you solved recently.'];
    const index = previousQuestions.length % fallback.length;
    return fallback[index];
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });
  const data = await response.json();
  const question = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  return question || 'Unable to generate question.';
}

// Compatibility alias used by Interview component
export const fetchQuestion = generateQuestion;

export async function evaluateAnswer({ role, difficulty, question, answer, previousQuestions = [] }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isMock = !apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '';
  const prompt = `You are a senior technical interviewer evaluating a candidate's answer.
Role: ${role}
Difficulty: ${difficulty}
Question: ${question}
Candidate Answer: ${answer}
Previous Questions Asked: ${previousQuestions.join(' | ')}

Provide the following in JSON format (no additional text):
{
  "overallScore": number (0-10),
  "technicalScore": number (0-10),
  "communicationScore": number (0-10),
  "confidenceScore": number (0-10),
  "timeManagementScore": number (0-10),
  "correctness": "Correct" | "Partially Correct" | "Incorrect",
  "correctPoints": string,
  "mistakes": string,
  "missingConcepts": string,
  "improvementSuggestions": string,
  "idealAnswer": string,
  "communicationFeedback": string,
  "confidenceFeedback": string,
  "timeManagementFeedback": string,
  "nextQuestion": string
}`;

  if (isMock) {
    const mockOverallScore = Math.min(10, Math.max(0, Math.round(Math.random() * 8) + 2));
    const mockTechnicalScore = Math.min(10, Math.max(0, Math.round(Math.random() * 8) + 2));
    const mockCommunicationScore = Math.min(10, Math.max(0, Math.round(Math.random() * 8) + 2));
    const mockConfidenceScore = Math.min(10, Math.max(0, Math.round(Math.random() * 8) + 2));
    const mockTimeManagementScore = Math.min(10, Math.max(0, Math.round(Math.random() * 8) + 2));
    const mockCorrectness = mockOverallScore > 7 ? 'Correct' : mockOverallScore > 4 ? 'Partially Correct' : 'Incorrect';
    const mockCorrectPoints = mockOverallScore > 7
      ? 'You explained the key concepts clearly and covered the main points well. Good use of technical terminology.'
      : mockOverallScore > 4
      ? 'You mentioned some relevant points and showed basic understanding of the topic.'
      : '';
    const mockMistakes = mockOverallScore <= 4
      ? 'You missed several core concepts and the explanation lacked technical depth.'
      : mockOverallScore <= 7
      ? 'The answer was incomplete and could have covered edge cases and examples.'
      : '';
    const mockMissingConcepts = mockOverallScore <= 7
      ? 'Core principles, edge case handling, and practical examples were not discussed.'
      : '';
    const mockImprovementSuggestions = mockOverallScore <= 7
      ? 'Study the fundamentals more deeply and practice explaining with concrete examples. Review official documentation and build small projects to reinforce concepts.'
      : '';
    const mockIdealAnswer = 'A comprehensive answer covering all aspects with concrete examples, edge cases, and best practices.';
    const mockCommunicationFeedback = 'Speak clearly, structure your answer with a beginning, middle, and end.';
    const mockConfidenceFeedback = 'Show confidence — pause to think before answering rather than rushing.';
    const mockTimeManagementFeedback = 'Allocate time evenly across main points. Spend about 30% on intro, 60% on details, 10% on summary.';
    const next = await generateQuestion(role, difficulty, [...previousQuestions, question]);
    return {
      correctness: mockCorrectness,
      overallScore: mockOverallScore,
      technicalScore: mockTechnicalScore,
      communicationScore: mockCommunicationScore,
      confidenceScore: mockConfidenceScore,
      timeManagementScore: mockTimeManagementScore,
      correctPoints: mockCorrectPoints,
      mistakes: mockMistakes,
      missingConcepts: mockMissingConcepts,
      improvementSuggestions: mockImprovementSuggestions,
      idealAnswer: mockIdealAnswer,
      communicationFeedback: mockCommunicationFeedback,
      confidenceFeedback: mockConfidenceFeedback,
      timeManagementFeedback: mockTimeManagementFeedback,
      nextQuestion: next,
      feedback: `Your answer demonstrates ${mockOverallScore > 7 ? 'strong' : 'partial'} understanding.`
    };
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });
  const data = await response.json();
  const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  try {
    return JSON.parse(resultText);
  } catch (e) {
    console.error('Failed to parse Gemini evaluation JSON', e);
    return { score: 0, feedback: 'Evaluation failed.', nextQuestion: '' };
  }
}

export async function finalEvaluation(transcript) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isMock = !apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '';
  const prompt = `You are a senior technical interviewer. Based on the following interview transcript, provide an overall evaluation in JSON format:\n${JSON.stringify(transcript, null, 2)}\n\nReturn:\n{\n  "overallScore": number,\n  "technicalScore": number,\n  "communicationScore": number,\n  "confidenceScore": number,\n  "timeManagementScore": number,\n  "strengths": string,\n  "weaknesses": string,\n  "suggestedLearningTopics": string\n}`;

  if (isMock) {
    // Simple aggregate mock
    const avgScore = transcript.reduce((a, q) => a + (q.evaluation?.overallScore ?? q.evaluation?.score ?? 0), 0) / transcript.length || 0;
    const rounded = Math.round(avgScore * 10) / 10;
    return {
      overallScore: rounded,
      technicalScore: rounded,
      communicationScore: rounded,
      confidenceScore: rounded,
      timeManagementScore: rounded,
      strengths: 'Shows solid fundamentals.',
      weaknesses: 'Could improve depth in some areas.',
      suggestedLearningTopics: 'Advanced algorithms, system design.'
    };
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });
  const data = await response.json();
  const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  try {
    return JSON.parse(resultText);
  } catch (e) {
    console.error('Failed to parse final evaluation JSON', e);
    return {};
  }
}

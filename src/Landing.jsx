import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JOB_ROLES = [
  'Python Developer',
  'Frontend Developer',
  'Full Stack Developer',
  'Backend Developer',
  'AI/ML Engineer',
  'Data Analyst',
  'Data Scientist',
  'DevOps Engineer',
  'Cyber Security Analyst',
  'Mobile App Developer'
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function Landing() {
  const navigate = useNavigate();
  const [role, setRole] = useState(JOB_ROLES[0]);
  const [difficulty, setDifficulty] = useState('Medium');

  const handleStart = () => {
    // Persist selection for interview component
    sessionStorage.setItem('selectedRole', role);
    sessionStorage.setItem('selectedDifficulty', difficulty);
    navigate('/interview');
  };

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-lg mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
        AI Interview Coach
      </h1>
      <div className="w-full p-8 mb-4 glass-card">
        <label className="block mb-6">
          <span className="block text-sm font-semibold mb-2 text-[var(--text-secondary)]">Select Job Role</span>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="input-field"
          >
            {JOB_ROLES.map(r => (
              <option key={r} value={r} className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">{r}</option>
            ))}
          </select>
        </label>
        <label className="block mb-6">
          <span className="block text-sm font-semibold mb-2 text-[var(--text-secondary)]">Select Difficulty</span>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="input-field"
          >
            {DIFFICULTIES.map(d => (
              <option key={d} value={d} className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">{d}</option>
            ))}
          </select>
        </label>
        <button
          onClick={handleStart}
          className="btn btn-primary w-full mt-6 btn-lg"
        >
          Generate &amp; Begin Interview
        </button>
      </div>
    </div>
  );
}

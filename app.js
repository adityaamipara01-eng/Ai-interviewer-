// React Hooks and State
const { useState, useEffect, useRef } = React;

// Icon SVG repository helper to keep UI premium and clean without loading latency
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    user: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    ),
    lock: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
    mail: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    key: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m-5 4a3.3 3.3 0 11-7.36-3.48A3.34 3.34 0 019 10v2h2v2h2l1 1v2h2v-2a3 3 0 00.82-2.18zM17.5 7.5L21 4" />
    ),
    settings: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    ),
    logout: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    ),
    mic: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
    ),
    volume2: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    ),
    volumeX: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm11.334-7.07l4.242 4.242m0-4.242L16.92 12.172" />
    ),
    arrowRight: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    ),
    award: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    ),
    trendingUp: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    ),
    clock: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    database: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    ),
    sparkles: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    ),
    check: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    ),
    alertCircle: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    fileText: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    checkCircle: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    refresh: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3m0 0l3 3m-3-3v8" />
    )
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {icons[name] || <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
    </svg>
  );
};

// Global App Container
function App() {
  // Config & API Keys state (persisted in local storage)
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('prep_supabase_url') || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(localStorage.getItem('prep_supabase_key') || '');
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('prep_gemini_key') || '');
  const [devMockMode, setDevMockMode] = useState(localStorage.getItem('prep_mock_mode') === 'true' || true);

  // Auth States
  const [user, setUser] = useState(null);
  const [view, setView] = useState('LOGIN'); // 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD' | 'UPDATE_PASSWORD' | 'DASHBOARD' | 'SETUP' | 'SESSION' | 'REPORT'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // App Domain States
  const [profile, setProfile] = useState({ name: '', target_role: '', experience_level: 'Entry Level' });
  const [interviews, setInterviews] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // questionIndex -> answer details
  const [resumeInfo, setResumeInfo] = useState(null); // { name, size, url, uploadedAt }
  const [uploadingResume, setUploadingResume] = useState(false);
  
  // UI Utilities
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [toast, setToast] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  // Mock Interview Form Options
  const [setupForm, setSetupForm] = useState({
    role: 'Frontend Developer',
    difficulty: 'Intermediate',
    techStack: 'React, Javascript, Tailwind CSS',
    resumeText: '',
    numQuestions: 3
  });

  // Speech & Session States
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [timerCount, setTimerCount] = useState(120); // 2 minutes per question
  
  // Custom states for Timer & Transcript features
  const [theme, setTheme] = useState(localStorage.getItem('prep_theme') || 'dark');
  const [isQuestionAccepted, setIsQuestionAccepted] = useState(false);
  const [acceptanceTimerCount, setAcceptanceTimerCount] = useState(60);
  const [timeSpent, setTimeSpent] = useState(0);
  const [answerMode, setAnswerMode] = useState('write'); // 'write' | 'speak'
  
  // Refs for audio analysis & speech
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const timerRef = useRef(null);
  const supabaseClientRef = useRef(null);

  // Trigger Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Safe Supabase Client Initializer
  const getSupabase = () => {
    if (devMockMode) return null;
    if (supabaseClientRef.current) return supabaseClientRef.current;
    
    if (supabaseUrl && supabaseAnonKey) {
      try {
        supabaseClientRef.current = supabase.createClient(supabaseUrl, supabaseAnonKey);
        return supabaseClientRef.current;
      } catch (err) {
        console.error("Supabase Init Error:", err);
        showToast("Supabase configuration invalid. Defaulting to Offline Mock Mode.", "warning");
        setDevMockMode(true);
        return null;
      }
    }
    return null;
  };

  // Sync session on mount
  useEffect(() => {
    const sb = getSupabase();
    if (sb) {
      sb.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setUser(session.user);
          setView('DASHBOARD');
          fetchUserProfile(session.user.id);
          fetchInterviewsList(session.user.id);
        }
      });

      const { data: { subscription } } = sb.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setView('UPDATE_PASSWORD');
        } else if (session) {
          setUser(session.user);
          setView('DASHBOARD');
          fetchUserProfile(session.user.id);
          fetchInterviewsList(session.user.id);
        } else {
          setUser(null);
          setView('LOGIN');
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Mock login state for developer preview if Supabase is offline
      const mockSessionUser = localStorage.getItem('prep_mock_user');
      if (mockSessionUser) {
        const parsed = JSON.parse(mockSessionUser);
        setUser(parsed);
        setView('DASHBOARD');
        fetchUserProfile(parsed.id);
        fetchInterviewsList(parsed.id);
      }
    }
  }, [supabaseUrl, supabaseAnonKey, devMockMode]);

  // Handle local storage updates
  const saveConfig = (url, key, gemini, mock) => {
    localStorage.setItem('prep_supabase_url', url);
    localStorage.setItem('prep_supabase_key', key);
    localStorage.setItem('prep_gemini_key', gemini);
    localStorage.setItem('prep_mock_mode', mock);
    setSupabaseUrl(url);
    setSupabaseAnonKey(key);
    setGeminiKey(gemini);
    setDevMockMode(mock);
    supabaseClientRef.current = null; // force reinit
    showToast("API & Environment configuration updated successfully!", "success");
    setShowConfig(false);
  };

  // Fetch profiles from Supabase DB or Mock
  const fetchUserProfile = async (userId) => {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
      if (!error && data) {
        setProfile(data);
      } else {
        // Create initial profile if missing
        const newProfile = { id: userId, name: fullName || user.email.split('@')[0], target_role: 'Software Engineer', experience_level: 'Entry Level' };
        await sb.from('profiles').insert([newProfile]);
        setProfile(newProfile);
      }
    } else {
      const cachedProfile = localStorage.getItem(`prep_profile_${userId}`);
      if (cachedProfile) {
        setProfile(JSON.parse(cachedProfile));
      } else {
        const defaultProf = { name: user?.email ? user.email.split('@')[0] : 'Guest Candidate', target_role: 'Full Stack Engineer', experience_level: 'Intermediate' };
        setProfile(defaultProf);
      }
    }
  };

  // Fetch interviews history from Supabase DB or Mock
  const fetchInterviewsList = async (userId) => {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from('interviews')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (!error && data) setInterviews(data);
    } else {
      const mockHistory = localStorage.getItem(`prep_interviews_${userId}`);
      setInterviews(mockHistory ? JSON.parse(mockHistory) : []);
    }
  };

  // Auth Operations
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      showToast("Please fill in all signup details.", "error");
      return;
    }
    setLoading(true);
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: { data: { name: fullName } }
      });
      setLoading(false);
      if (error) {
        showToast(error.message, "error");
      } else {
        showToast("Signup successful! Please check your email for confirmation.", "success");
        setView('LOGIN');
      }
    } else {
      // Mock Sign Up
      setTimeout(() => {
        setLoading(false);
        const mockUser = { id: 'mock-user-123', email, user_metadata: { name: fullName } };
        localStorage.setItem('prep_mock_user', JSON.stringify(mockUser));
        localStorage.setItem(`prep_profile_mock-user-123`, JSON.stringify({ name: fullName, target_role: 'Full Stack Engineer', experience_level: 'Intermediate' }));
        setUser(mockUser);
        setView('DASHBOARD');
        showToast("Logged in as mock preview user successfully!", "success");
      }, 800);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter email and password.", "error");
      return;
    }
    setLoading(true);
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        showToast(error.message, "error");
      } else {
        showToast("Welcome back!", "success");
      }
    } else {
      // Mock Login
      setTimeout(() => {
        setLoading(false);
        const mockUser = { id: 'mock-user-123', email, user_metadata: { name: fullName || 'Candidate' } };
        localStorage.setItem('prep_mock_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setView('DASHBOARD');
        showToast("Logged in as mock preview user!", "success");
      }, 800);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your email address.", "error");
      return;
    }
    setLoading(true);
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      setLoading(false);
      if (error) {
        showToast(error.message, "error");
      } else {
        showToast("Password reset link sent to your email!", "success");
        setView('LOGIN');
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        showToast("Offline Mode Mock: Password reset link simulated to your inbox.", "success");
        setView('LOGIN');
      }, 800);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }
    setLoading(true);
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.auth.updateUser({ password: newPassword });
      setLoading(false);
      if (error) {
        showToast(error.message, "error");
      } else {
        showToast("Password updated successfully! Welcome back.", "success");
        setView('DASHBOARD');
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        showToast("Offline Mode Mock: Password updated successfully!", "success");
        setView('DASHBOARD');
      }, 800);
    }
  };

  const handleLogout = async () => {
    const sb = getSupabase();
    if (sb) {
      await sb.auth.signOut();
    } else {
      localStorage.removeItem('prep_mock_user');
      setUser(null);
      setView('LOGIN');
    }
    showToast("Logged out successfully.", "info");
  };

  const updateProfile = async (updates) => {
    const sb = getSupabase();
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    if (sb) {
      await sb.from('profiles').upsert({ id: user.id, ...updatedProfile });
    } else {
      localStorage.setItem(`prep_profile_${user.id}`, JSON.stringify(updatedProfile));
    }
    showToast("Profile updated successfully!", "success");
  };

  // Google Gemini API Gateway
  const askGemini = async (promptText) => {
    if (devMockMode || !geminiKey) {
      // Return custom simulator answers if Gemini is unavailable
      console.log("Using Mock Response for prompt:", promptText.substring(0, 100));
      return null;
    }
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "Gemini API Request failed");
      }

      const resJson = await response.json();
      const rawText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
      return JSON.parse(rawText.trim());
    } catch (err) {
      console.error("Gemini Query Failed:", err);
      showToast(`Gemini Error: ${err.message}. Falling back to Simulated Mock answers.`, "warning");
      return null;
    }
  };

  // Initialize Audio Voice (Speech Recognition Setup)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        let finalTrans = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTrans += event.results[i][0].transcript;
          }
        }
        if (finalTrans) {
          setCurrentTranscript(prev => (prev + ' ' + finalTrans).trim());
        }
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error", e);
        if (e.error === 'not-allowed') {
          showToast("Microphone permission denied.", "error");
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Handle Theme Effects
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('prep_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleRetryRecording = () => {
    setCurrentTranscript('');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error(e);
        }
      }, 300);
    }
  };

  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const renderCircularTimer = (current, duration, label, isLow) => {
    const pct = (current / duration) * 100;
    const radius = 32;
    const circ = 2 * Math.PI * radius;
    const strokePct = ((100 - pct) / 100) * circ;
    
    return (
      <div class="flex flex-col items-center justify-center shrink-0">
        <div class="relative w-20 h-20">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r={radius}
              class="stroke-white/10"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              className={`transition-all duration-1000 ease-linear ${
                isLow ? 'stroke-red-500 animate-pulse' : 'stroke-brand-500'
              }`}
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circ}
              strokeDashoffset={strokePct}
              strokeLinecap="round"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center flex-col">
            <span class={`text-sm font-black font-mono ${isLow ? 'text-red-400' : 'text-white'}`}>
              {current}s
            </span>
          </div>
        </div>
        {label && <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">{label}</span>}
      </div>
    );
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      showToast("Speech Recognition not supported in this browser. Please type your answer.", "warning");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setCurrentTranscript('');
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // New helper to explicitly stop listening (used for a dedicated Stop button)
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Text to Speech Voice Output
  const speakText = (text) => {
    if (!ttsEnabled || !synthRef.current) return;
    synthRef.current.cancel(); // stop current reading
    const utterance = new SpeechSynthesisUtterance(text);
    // Find a friendly English natural sounding voice if available
    const voices = synthRef.current.getVoices();
    const englishVoice =
      voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
      voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;
    utterance.rate = 1.05;
    synthRef.current.speak(utterance);
  };

  // Automatically read each new interview question aloud when it appears
  useEffect(() => {
    if (ttsEnabled && questions[currentQuestionIdx]) {
      speakText(questions[currentQuestionIdx].question_text);
    }
  }, [currentQuestionIdx, questions, ttsEnabled]);

  const stopSpeaking = () => {
    if (synthRef.current) synthRef.current.cancel();
  };

  // Mock Simulator Generators for Offline mode / Dev Testing
  const getMockQuestions = (role, difficulty, stack) => {
    return [
      {
        question_text: `Can you design a high-performance feature using ${(stack && typeof stack === 'string') ? (stack.split(',')[0] || 'modern tech') : 'modern tech'} and describe how you'd manage its state updates?`,
        category: "Technical"
      },
      {
        question_text: `Tell me about a time when you disagreed with a senior engineer or product manager about the technical scope of a project. How did you resolve it?`,
        category: "Behavioral"
      },
      {
        question_text: `Imagine our mock mock-application experience is seeing a sudden 300% latency spike in production. What is your systematic process to debug this live?`,
        category: "Scenario"
      }
    ];
  };

  const getMockQuestionEvaluation = (question, candidateAnswer, timeTaken, mode, maxDuration) => {
    const score = Math.round((7.0 + Math.random() * 2.5) * 10) / 10;
    
    let timeScore = 9;
    if (timeTaken > maxDuration * 0.9) timeScore = 6;
    else if (timeTaken < 10) timeScore = 4;
    
    return {
      score,
      strengths: ["Clear structure", "Practical tech application"],
      weaknesses: ["Could include more specific metrics", "Pacing could be optimized"],
      feedback: `The candidate provided a solid structure, but could emphasize specific details. Highlights include clear communication. For improvements, try incorporating structural details or the STAR method for behavioral answers.`,
      sample_answer: `Situation: Describe the scenario. Task: Detail the challenge. Action: Outline your specific execution steps. Result: Share quantitative business outcomes.`,
      categories: {
        technical_accuracy: Math.round(score + (Math.random() - 0.5)),
        communication_skills: Math.round(score + (Math.random() - 0.5)),
        completeness: Math.round(score - 0.5 + Math.random()),
        confidence_level: mode === 'Voice' ? 8 : 7,
        time_management: timeScore
      }
    };
  };

  const getMockFinalSummary = (role, results) => {
    const sumScore = results.reduce((acc, curr) => acc + curr.score, 0);
    const avgScore = Math.round((sumScore / results.length) * 10) / 10;
    
    let avgTech = 0, avgComm = 0, avgComp = 0, avgConf = 0, avgTime = 0, validCount = 0;
    results.forEach(res => {
      if (res.categories) {
        avgTech += res.categories.technical_accuracy || 0;
        avgComm += res.categories.communication_skills || 0;
        avgComp += res.categories.completeness || 0;
        avgConf += res.categories.confidence_level || 0;
        avgTime += res.categories.time_management || 0;
        validCount++;
      }
    });
    
    const count = validCount || 1;
    const finalTech = Math.min(100, Math.round((avgTech / count) * 10));
    const finalComm = Math.min(100, Math.round((avgComm / count) * 10));
    const finalComp = Math.min(100, Math.round((avgComp / count) * 10));
    const finalConf = Math.min(100, Math.round((avgConf / count) * 10));
    const finalTime = Math.min(100, Math.round((avgTime / count) * 10));
    
    return {
      overall_score: avgScore,
      feedback_summary: `Overall, the candidate demonstrates high competence for a ${role} position. Communication is polished and easy to follow. Technical knowledge is solid, though answering scenarios under high stress needs structural training.`,
      categories: {
        technical: finalTech || Math.min(100, Math.round(avgScore * 10 - 2)),
        communication: finalComm || Math.min(100, Math.round(avgScore * 10 + 4)),
        problem_solving: finalComp || Math.min(100, Math.round(avgScore * 10 - 5)),
        confidence: finalConf || Math.min(100, Math.round(avgScore * 10)),
        time_management: finalTime || 85
      },
      actionable_tips: [
        "Include quantitative statistics (e.g. 'reduced latency by 40%') to prove project achievements.",
        "Structure behavioral scenarios explicitly around the Situation-Task-Action-Result format.",
        "Practice deep-dive architectural design concepts to address complex load patterns."
      ]
    };
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast("Only PDF resumes are supported.", "error");
      return;
    }
    
    setUploadingResume(true);
    showToast("Uploading PDF resume...", "info");
    
    const sb = getSupabase();
    if (sb) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload to Supabase Storage bucket 'resumes'
        const { data, error } = await sb.storage
          .from('resumes')
          .upload(filePath, file, { cacheControl: '3600', upsert: true });
          
        if (error) throw error;
        
        // Get public URL
        const { data: { publicUrl } } = sb.storage
          .from('resumes')
          .getPublicUrl(filePath);
          
        const uploadedInfo = {
          name: file.name,
          size: file.size,
          url: publicUrl,
          path: filePath,
          uploadedAt: new Date().toISOString()
        };
        
        setResumeInfo(uploadedInfo);
        
        // Save file url in database profiles table for current user
        await sb.from('profiles').update({ resume_url: publicUrl }).eq('id', user.id);
        
        showToast("Resume uploaded and stored in Supabase Storage!", "success");
      } catch (err) {
        console.error("Resume Upload Error:", err);
        showToast(`Upload failed: ${err.message}`, "error");
      } finally {
        setUploadingResume(false);
      }
    } else {
      // Mock Resume Upload
      setTimeout(() => {
        const mockUrl = `https://mock-supabase-storage.co/resumes/${user?.id || 'guest'}/${file.name}`;
        const uploadedInfo = {
          name: file.name,
          size: file.size,
          url: mockUrl,
          path: `resumes/${file.name}`,
          uploadedAt: new Date().toISOString()
        };
        setResumeInfo(uploadedInfo);
        showToast("Simulated upload successful! Saved in Mock Storage.", "success");
        setUploadingResume(false);
      }, 1000);
    }
  };

  const clearResume = () => {
    setResumeInfo(null);
    showToast("Resume removed.", "info");
  };

  // Start Interview Flow
  const startInterview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingMsg("Generating personalized interview questions using AI...");
    
    const sb = getSupabase();
    let interviewId = 'mock-id-' + Date.now();
    
    const finalResumeSummary = setupForm.resumeText || (resumeInfo ? `Uploaded PDF Resume: ${resumeInfo.name}` : '');
    const finalResumeUrl = resumeInfo ? resumeInfo.url : null;
    
    // Save Initial Interview Metadata
    if (sb) {
      const { data, error } = await sb.from('interviews').insert([{
        role: setupForm.role,
        difficulty: setupForm.difficulty,
        tech_stack: setupForm.techStack,
        resume_summary: finalResumeSummary,
        resume_url: finalResumeUrl,
        status: 'in_progress'
      }]).select().single();
      
      if (!error && data) interviewId = data.id;
    }

    const interviewObj = {
      id: interviewId,
      role: setupForm.role,
      difficulty: setupForm.difficulty,
      techStack: setupForm.techStack,
      resumeText: finalResumeSummary,
      resumeUrl: finalResumeUrl,
      numQuestions: setupForm.numQuestions
    };
    setCurrentInterview(interviewObj);

    // Call Gemini API to generate custom questions
    const promptText = `Generate ${setupForm.numQuestions} mock interview questions for a candidate.
Job Role: ${setupForm.role}
Difficulty Level: ${setupForm.difficulty}
Tech Stack: ${setupForm.techStack}
Resume Summary: ${finalResumeSummary || 'None provided'}

Format the output STRICTLY as a JSON array of objects (no markdown wrapping, just the raw JSON text), each containing:
- "question_text": The interview question.
- "category": The type of question ("Technical", "Behavioral", or "Scenario").`;

    let generatedQuestions = await askGemini(promptText);
    
    // Fallback if Gemini fails or is offline
    if (!generatedQuestions) {
      generatedQuestions = getMockQuestions(setupForm.role, setupForm.difficulty, setupForm.techStack);
    }

    // Save Questions in DB
    if (sb) {
      const questionsData = generatedQuestions.map(q => ({
        interview_id: interviewId,
        question_text: q.question_text
      }));
      await sb.from('questions').insert(questionsData);
    }

    setQuestions(generatedQuestions);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setCurrentTranscript('');
    setIsQuestionAccepted(false);
    setAcceptanceTimerCount(60);
    setTimeSpent(0);
    setTimerCount(getAnswerDuration());
    setLoading(false);
    setView('SESSION');

    // Speak first question
    setTimeout(() => {
      speakText(generatedQuestions[0].question_text);
    }, 800);
  };

  const getAnswerDuration = () => {
    const diff = (currentInterview && currentInterview.difficulty) || setupForm.difficulty || 'Medium';
    const diffLower = diff.toLowerCase();
    if (diffLower.includes('easy')) return 60;
    if (diffLower.includes('hard') || diffLower.includes('senior')) return 120;
    return 90; // Medium / Intermediate / default
  };

  // Reset states when current question changes
  useEffect(() => {
    if (view === 'SESSION') {
      const savedDraft = localStorage.getItem(`prep_draft_${currentInterview?.id}_${currentQuestionIdx}`);
      if (savedDraft) {
        setCurrentTranscript(savedDraft);
        showToast("Restored draft response.", "success");
      } else {
        setCurrentTranscript('');
      }
      setIsQuestionAccepted(false);
      setAcceptanceTimerCount(60);
      setTimeSpent(0);
      setTimerCount(getAnswerDuration());
    }
  }, [currentQuestionIdx, view]);

  // Timer effect for Interview Session
  useEffect(() => {
    if (view !== 'SESSION') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (!isQuestionAccepted) {
        setAcceptanceTimerCount(prev => {
          if (prev <= 1) {
            handleSkipQuestion(true); // timeout skip
            return 60;
          }
          return prev - 1;
        });
      } else {
        setTimerCount(prev => {
          if (prev <= 1) {
            handleNextQuestion(true); // timeout submit
            return 90;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view, isQuestionAccepted, currentQuestionIdx]);

  // Auto-save draft in text mode
  useEffect(() => {
    if (view !== 'SESSION' || !isQuestionAccepted || answerMode !== 'write') return;
    
    const timer = setTimeout(() => {
      if (currentTranscript.trim()) {
        localStorage.setItem(`prep_draft_${currentInterview?.id}_${currentQuestionIdx}`, currentTranscript);
        showToast("Draft auto-saved", "info");
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentTranscript, view, isQuestionAccepted, currentQuestionIdx, answerMode]);

  // Next / Submit Question Flow
  const handleNextQuestion = async (timeOut = false) => {
    // Stop recording and speaking
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    stopSpeaking();

    const currentAnswer = currentTranscript.trim() || "Unanswered.";
    setLoading(true);
    setLoadingMsg("AI is analyzing your response...");

    const maxDuration = getAnswerDuration();

    // 1. Analyze Answer using Gemini
    const evaluationPrompt = `Evaluate the candidate's response to this mock interview question.
    Context: Job Role: ${currentInterview.role}, Difficulty: ${currentInterview.difficulty}, Tech Stack: ${currentInterview.techStack}.
    Question: "${questions[currentQuestionIdx].question_text}"
    Candidate's Response: "${currentAnswer}"
    Time Taken to Answer: ${timeSpent} seconds (based on a difficulty limit of ${maxDuration} seconds)
    Answer Mode: ${answerMode === 'write' ? 'Text' : 'Voice'}
    
    Format the output STRICTLY as a JSON object (no markdown wrapping, just the raw JSON text) containing:
    - "score": A float score from 0.0 to 10.0 representing the overall quality of the response.
    - "strengths": A concise list (array of strings) highlighting the strong points of the answer.
    - "weaknesses": A concise list (array of strings) describing the shortcomings or areas for improvement.
    - "feedback": A detailed evaluation summarizing strengths, weaknesses, and overall impression.
    - "sample_answer": A high-quality model answer demonstrating how to answer this question.
    - "categories": A JSON object containing score out of 10 for:
       * "technical_accuracy": A float or integer from 0 to 10
       * "communication_skills": A float or integer from 0 to 10
       * "completeness": A float or integer from 0 to 10
       * "confidence_level": A float or integer from 0 to 10
       * "time_management": A float or integer from 0 to 10`;

    let evaluation = await askGemini(evaluationPrompt);
    if (!evaluation) {
      evaluation = getMockQuestionEvaluation(questions[currentQuestionIdx].question_text, currentAnswer, timeSpent, answerMode === 'write' ? 'Text' : 'Voice', maxDuration);
    }

    // Save Answer and feedback
    const questionReport = {
      question_text: questions[currentQuestionIdx].question_text,
      category: questions[currentQuestionIdx].category,
      user_answer: currentAnswer,
      score: evaluation.score,
      strengths: evaluation.strengths || [],
      weaknesses: evaluation.weaknesses || [],
      feedback: evaluation.feedback,
      sample_answer: evaluation.sample_answer,
      time_taken: timeSpent,
      answer_mode: answerMode === 'write' ? 'Text' : 'Voice',
      is_skipped: false,
      categories: evaluation.categories || {
        technical_accuracy: Math.round(evaluation.score),
        communication_skills: Math.round(evaluation.score),
        completeness: Math.round(evaluation.score),
        confidence_level: answerMode === 'write' ? 7 : 8,
        time_management: 9
      }
    };

    const newAnswers = { ...answers, [currentQuestionIdx]: questionReport };
    setAnswers(newAnswers);

    // Save question details to Supabase DB
    const sb = getSupabase();
    if (sb) {
      const { data: qRows } = await sb.from('questions')
        .select('id')
        .eq('interview_id', currentInterview.id)
        .eq('question_text', questions[currentQuestionIdx].question_text)
        .limit(1);

      if (qRows && qRows.length > 0) {
        await sb.from('questions').update({
            user_answer: currentAnswer,
            strengths: evaluation.strengths || [],
            weaknesses: evaluation.weaknesses || [],
            feedback: evaluation.feedback,
            score: evaluation.score,
            sample_answer: evaluation.sample_answer
          }).eq('id', qRows[0].id);
      }
    }

    setLoading(false);
    setCurrentTranscript('');
    setIsQuestionAccepted(false);
    setAcceptanceTimerCount(60);
    setTimeSpent(0);

    // Go to next question or finalize
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      finalizeInterview(newAnswers);
    }
  };

  // Skip Question Flow
  const handleSkipQuestion = async (timeOut = false) => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    stopSpeaking();

    const skippedReport = {
      question_text: questions[currentQuestionIdx].question_text,
      category: questions[currentQuestionIdx].category,
      user_answer: timeOut ? "Question skipped due to timeout." : "Question skipped by candidate.",
      score: 0,
      strengths: [],
      weaknesses: ["Question skipped"],
      feedback: timeOut ? "The candidate did not accept this question within the 60-second window." : "The candidate chose to skip this question.",
      sample_answer: "No model answer generated for skipped question.",
      time_taken: 0,
      answer_mode: answerMode === 'write' ? 'Text' : 'Voice',
      is_skipped: true,
      categories: {
        technical_accuracy: 0,
        communication_skills: 0,
        completeness: 0,
        confidence_level: 0,
        time_management: 0
      }
    };

    const newAnswers = { ...answers, [currentQuestionIdx]: skippedReport };
    setAnswers(newAnswers);

    const sb = getSupabase();
    if (sb) {
      const { data: qRows } = await sb.from('questions')
        .select('id')
        .eq('interview_id', currentInterview.id)
        .eq('question_text', questions[currentQuestionIdx].question_text)
        .limit(1);

      if (qRows && qRows.length > 0) {
        await sb.from('questions').update({
            user_answer: skippedReport.user_answer,
            strengths: skippedReport.strengths,
            weaknesses: skippedReport.weaknesses,
            feedback: skippedReport.feedback,
            score: 0,
            sample_answer: skippedReport.sample_answer
          }).eq('id', qRows[0].id);
      }
    }

    if (timeOut) {
      showToast("Question skipped due to timeout.", "warning");
    } else {
      showToast("Question skipped.", "info");
    }

    setCurrentTranscript('');
    setIsQuestionAccepted(false);
    setAcceptanceTimerCount(60);
    setTimeSpent(0);

    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      finalizeInterview(newAnswers);
    }
  };

  // Compile full feedback and report
  const finalizeInterview = async (completedAnswers) => {
    setLoading(true);
    setLoadingMsg("Generating final placements analysis report...");

    const answerListText = Object.values(completedAnswers).map((ans, i) => {
      return `Q${i+1}: ${ans.question_text}\nA${i+1}: ${ans.user_answer}\nScore: ${ans.score}/10\nTime Taken: ${ans.time_taken}s\nMode: ${ans.answer_mode}\nSkipped: ${ans.is_skipped ? 'Yes' : 'No'}\n`;
    }).join('\n');

    const finalSummaryPrompt = `Synthesize a final review for this interview session.
Job Role: ${currentInterview.role}
Difficulty Level: ${currentInterview.difficulty}
Tech Stack: ${currentInterview.techStack}
Questions & Answers:
${answerListText}

Format the output STRICTLY as a JSON object (no markdown wrapping, just the raw JSON text) containing:
- "overall_score": A float score from 0.0 to 10.0 (typically the average of question scores).
- "feedback_summary": A detailed overall summary of the interview performance.
- "categories": A JSON object containing:
   * "technical": A float or integer from 0 to 100 representing technical accuracy.
   * "communication": A float or integer from 0 to 100 representing communication effectiveness.
   * "problem_solving": A float or integer from 0 to 100 representing problem solving and completeness.
   * "confidence": A float or integer from 0 to 100 representing confidence score.
   * "time_management": A float or integer from 0 to 100 representing time management score.
- "actionable_tips": An array of 3-4 actionable tips to improve.`;

    let finalAnalysis = await askGemini(finalSummaryPrompt);
    if (!finalAnalysis) {
      finalAnalysis = getMockFinalSummary(currentInterview.role, Object.values(completedAnswers));
    }

    const reportObj = {
      ...currentInterview,
      status: 'completed',
      score: finalAnalysis.overall_score,
      feedback: JSON.stringify(finalAnalysis),
      confidence_score: finalAnalysis.confidence_score,
      technical_score: finalAnalysis.technical_score,
      communication_score: finalAnalysis.communication_score,
      strengths: finalAnalysis.strengths,
      weak_areas: finalAnalysis.weak_areas,
      improvement_suggestions: finalAnalysis.improvement_suggestions,
      created_at: new Date().toISOString()
    };

    setCurrentInterview(reportObj);

    // Save final status to Supabase
    const sb = getSupabase();
    if (sb) {
      await sb.from('interviews').update({
        status: 'completed',
        score: finalAnalysis.overall_score,
        feedback: JSON.stringify(finalAnalysis)
      }).eq('id', currentInterview.id);
      
      fetchInterviewsList(user.id);
    } else {
      const mockHistory = localStorage.getItem(`prep_interviews_${user.id}`);
      const historyList = mockHistory ? JSON.parse(mockHistory) : [];
      const updatedHistory = [reportObj, ...historyList];
      localStorage.setItem(`prep_interviews_${user.id}`, JSON.stringify(updatedHistory));
      setInterviews(updatedHistory);
    }

    setLoading(false);
    setView('REPORT');
  };

  return (
    <div class="min-h-screen flex flex-col relative z-10 select-none">
      {/* Dynamic Toast Notifications */}
      {toast && (
        <div class={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-bounce ${
          toast.type === 'success' ? 'bg-green-950/80 border-green-500/30 text-green-300' :
          toast.type === 'error' ? 'bg-red-950/80 border-red-500/30 text-red-300' :
          toast.type === 'warning' ? 'bg-yellow-950/80 border-yellow-500/30 text-yellow-300' :
          'bg-dark-900/90 border-brand-500/30 text-brand-300'
        }`}>
          <Icon name={toast.type === 'success' ? 'checkCircle' : 'alertCircle'} className="w-5 h-5" />
          <span class="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Global Navbar */}
      <nav class="border-b border-white/5 bg-dark-950/50 backdrop-blur-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Icon name="sparkles" className="w-5 h-5 text-white" />
              </div>
              <div>
                <span class="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-brand-400">PrepGenius</span>
                <span class="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">AI Coach</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                class="p-2 rounded-lg border border-white/10 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all text-gray-400 hover:text-white"
                title="Toggle Light/Dark Theme"
              >
                {theme === 'dark' ? (
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>
                ) : (
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                )}
              </button>

              {/* Credentials / Config Trigger */}
              <button 
                onClick={() => setShowConfig(true)}
                class="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all text-gray-400 hover:text-white"
              >
                <Icon name="settings" className="w-4 h-4" />
                <span>API Settings</span>
                {devMockMode && (
                  <span class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                )}
              </button>

              {user && (
                <div class="flex items-center gap-3 border-l border-white/10 pl-4">
                  <div class="hidden md:block text-right">
                    <p class="text-xs font-semibold text-white">{profile.name || user.email.split('@')[0]}</p>
                    <p class="text-[10px] text-gray-400">{profile.target_role} ({profile.experience_level})</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    class="p-2 rounded-lg border border-white/5 hover:bg-red-500/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all"
                  >
                    <Icon name="logout" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {loading ? (
          /* Global Loader Overlay */
          <div class="flex-grow flex flex-col items-center justify-center py-12">
            <div class="glass-panel-glow p-8 rounded-2xl max-w-sm text-center">
              <div class="relative w-20 h-20 mx-auto mb-6">
                <div class="absolute inset-0 rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div class="absolute inset-2 rounded-full border-4 border-b-indigo-400 border-t-transparent border-r-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
              </div>
              <p class="text-base font-semibold text-white mb-2">Please wait</p>
              <p class="text-xs text-gray-400">{loadingMsg || "Loading database settings..."}</p>
            </div>
          </div>
        ) : (
          /* View Router */
          <>
            {view === 'LOGIN' && (
              <div class="max-w-md w-full mx-auto">
                <div class="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                  <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
                    <p class="text-xs text-gray-400 mt-2">Sign in to your placements preparation dashboard</p>
                  </div>
                  <form onSubmit={handleLogin} class="space-y-5">
                    <div>
                      <label class="block text-xs font-semibold text-gray-400 mb-1.5">Email Address</label>
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                          <Icon name="mail" className="w-4 h-4" />
                        </span>
                        <input 
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="name@university.edu"
                          class="block w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none" 
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center justify-between mb-1.5">
                        <label class="block text-xs font-semibold text-gray-400">Password</label>
                        <button type="button" onClick={() => setView('FORGOT_PASSWORD')} class="text-[11px] font-semibold text-brand-400 hover:text-brand-300 transition-all">Forgot password?</button>
                      </div>
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                          <Icon name="lock" className="w-4 h-4" />
                        </span>
                        <input 
                          type="password" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="••••••••"
                          class="block w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none" 
                          required
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      class="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/20 transition-all duration-150"
                    >
                      Sign In
                    </button>
                  </form>

                  <div class="mt-6 text-center border-t border-white/5 pt-6">
                    <p class="text-xs text-gray-400">
                      New to PrepGenius?{' '}
                      <button onClick={() => setView('SIGNUP')} class="font-bold text-brand-400 hover:text-brand-300 transition-all">Create an account</button>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {view === 'SIGNUP' && (
              <div class="max-w-md w-full mx-auto">
                <div class="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                  <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-white tracking-tight">Create your account</h2>
                    <p class="text-xs text-gray-400 mt-2">Get personalized placement review feedback</p>
                  </div>
                  <form onSubmit={handleSignUp} class="space-y-5">
                    <div>
                      <label class="block text-xs font-semibold text-gray-400 mb-1.5">Full Name</label>
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                          <Icon name="user" className="w-4 h-4" />
                        </span>
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          placeholder="Aditya"
                          class="block w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none" 
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-gray-400 mb-1.5">Email Address</label>
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                          <Icon name="mail" className="w-4 h-4" />
                        </span>
                        <input 
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="name@university.edu"
                          class="block w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none" 
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-gray-400 mb-1.5">Password</label>
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                          <Icon name="lock" className="w-4 h-4" />
                        </span>
                        <input 
                          type="password" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          class="block w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none" 
                          required
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      class="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/20 transition-all duration-150"
                    >
                      Get Started
                    </button>
                  </form>

                  <div class="mt-6 text-center border-t border-white/5 pt-6">
                    <p class="text-xs text-gray-400">
                      Already have an account?{' '}
                      <button onClick={() => setView('LOGIN')} class="font-bold text-brand-400 hover:text-brand-300 transition-all">Sign in</button>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {view === 'FORGOT_PASSWORD' && (
              <div class="max-w-md w-full mx-auto">
                <div class="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                  <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-white tracking-tight">Forgot Password?</h2>
                    <p class="text-xs text-gray-400 mt-2">Enter your email to receive a recovery link</p>
                  </div>
                  <form onSubmit={handleForgotPassword} class="space-y-5">
                    <div>
                      <label class="block text-xs font-semibold text-gray-400 mb-1.5">Email Address</label>
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                          <Icon name="mail" className="w-4 h-4" />
                        </span>
                        <input 
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="name@university.edu"
                          class="block w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none" 
                          required
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      class="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/20 transition-all duration-150"
                    >
                      Send Recovery Email
                    </button>
                  </form>

                  <div class="mt-6 text-center border-t border-white/5 pt-6">
                    <button onClick={() => setView('LOGIN')} class="text-xs font-bold text-brand-400 hover:text-brand-300 transition-all">Back to login</button>
                  </div>
                </div>
              </div>
            )}

            {view === 'UPDATE_PASSWORD' && (
              <div class="max-w-md w-full mx-auto">
                <div class="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                  <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-white tracking-tight">Set New Password</h2>
                    <p class="text-xs text-gray-400 mt-2">Enter a new secure password for your account</p>
                  </div>
                  <form onSubmit={handleUpdatePassword} class="space-y-5">
                    <div>
                      <label class="block text-xs font-semibold text-gray-400 mb-1.5">New Password</label>
                      <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                          <Icon name="lock" className="w-4 h-4" />
                        </span>
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          class="block w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none" 
                          required
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      class="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/20 transition-all duration-150"
                    >
                      Update Password & Sign In
                    </button>
                  </form>

                  <div class="mt-6 text-center border-t border-white/5 pt-6">
                    <button onClick={() => setView('LOGIN')} class="text-xs font-bold text-brand-400 hover:text-brand-300 transition-all">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {view === 'DASHBOARD' && (
              <div class="space-y-8 animate-fade-in">
                {/* Dashboard Header */}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="md:col-span-2 glass-panel p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-white/5">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="space-y-2">
                      <span class="text-[10px] tracking-wider uppercase font-bold text-brand-400 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">PLACEMENTS TRACKING</span>
                      <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">Welcome, {profile.name}!</h1>
                      <p class="text-xs sm:text-sm text-gray-400">Target Role: <span class="text-white font-semibold">{profile.target_role}</span> | Experience: <span class="text-white font-semibold">{profile.experience_level}</span></p>
                    </div>
                    <button 
                      onClick={() => setView('SETUP')}
                      class="flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.97] text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-500/20 transition-all group shrink-0"
                    >
                      <span>Start Mock Interview</span>
                      <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Profile Edit Panel */}
                  <div class="glass-panel p-6 rounded-2xl border border-white/5">
                    <h3 class="text-sm font-bold text-white mb-4">Edit Target Preferences</h3>
                    <div class="space-y-3.5">
                      <div>
                        <label class="block text-[10px] font-semibold text-gray-400 mb-1">Target Job Role</label>
                        <input 
                          type="text" 
                          value={profile.target_role}
                          onChange={e => updateProfile({ target_role: e.target.value })}
                          class="block w-full px-3 py-1.5 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-brand-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label class="block text-[10px] font-semibold text-gray-400 mb-1">Experience Level</label>
                        <select 
                          value={profile.experience_level}
                          onChange={e => updateProfile({ experience_level: e.target.value })}
                          class="block w-full px-3 py-1.5 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-brand-500 outline-none transition-all"
                        >
                          <option>Entry Level</option>
                          <option>Intermediate</option>
                          <option>Senior Developer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytical Stats Grid */}
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div class="glass-panel p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div class="p-3 bg-brand-500/10 text-brand-400 rounded-xl">
                      <Icon name="award" class="w-6 h-6" />
                    </div>
                    <div>
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Interviews</p>
                      <h4 class="text-xl font-extrabold text-white mt-0.5">{interviews.length}</h4>
                    </div>
                  </div>

                  <div class="glass-panel p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div class="p-3 bg-green-500/10 text-green-400 rounded-xl">
                      <Icon name="trendingUp" class="w-6 h-6" />
                    </div>
                    <div>
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Average Score</p>
                      <h4 class="text-xl font-extrabold text-white mt-0.5">
                        {interviews.length > 0 
                          ? (interviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / interviews.length).toFixed(1) 
                          : '0.0'}/10
                      </h4>
                    </div>
                  </div>

                  <div class="glass-panel p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div class="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                      <Icon name="sparkles" class="w-6 h-6" />
                    </div>
                    <div>
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Best Score</p>
                      <h4 class="text-xl font-extrabold text-white mt-0.5">
                        {interviews.length > 0 
                          ? Math.max(...interviews.map(i => i.score || 0)).toFixed(1) 
                          : '0.0'}/10
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Past Sessions List */}
                <div class="glass-panel p-6 rounded-2xl border border-white/5">
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h2 class="text-lg font-bold text-white">Interview History</h2>
                      <p class="text-xs text-gray-400">Review your past performance analysis reports</p>
                    </div>
                    {devMockMode && (
                      <span class="text-[10px] text-yellow-400 font-medium px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">Simulated Data Mode</span>
                    )}
                  </div>

                  {interviews.length === 0 ? (
                    <div class="text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
                      <div class="p-4 bg-white/5 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 text-gray-500">
                        <Icon name="fileText" class="w-6 h-6" />
                      </div>
                      <p class="text-sm font-semibold text-gray-300">No mock sessions found</p>
                      <p class="text-xs text-gray-500 mt-1">Start your first interview session above to get AI analysis</p>
                    </div>
                  ) : (
                    <div class="space-y-4">
                      {interviews.map((item) => {
                        const parsedFeedback = item.feedback ? JSON.parse(item.feedback) : {};
                        return (
                          <div key={item.id} class="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div class="flex items-center gap-2.5">
                                <h4 class="text-sm font-bold text-white">{item.role}</h4>
                                <span class={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                  item.difficulty === 'Senior' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                  item.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                  'bg-green-500/10 text-green-400 border border-green-500/20'
                                }`}>
                                  {item.difficulty}
                                </span>
                              </div>
                              <p class="text-xs text-gray-400 mt-1">Tech Stack: <span class="text-gray-300">{item.tech_stack}</span></p>
                              <p class="text-[10px] text-gray-500 mt-0.5">{new Date(item.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            <div class="flex items-center gap-6 justify-between md:justify-end shrink-0">
                              <div class="text-right">
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Score</p>
                                <p class="text-lg font-black text-brand-400">{item.score ? item.score.toFixed(1) : 'N/A'}<span class="text-xs text-gray-500">/10</span></p>
                              </div>
                              <button 
                                onClick={() => {
                                  setCurrentInterview(item);
                                  setView('REPORT');
                                }}
                                class="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold text-white rounded-lg border border-white/5 transition-all"
                              >
                                View Detailed Report
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {view === 'SETUP' && (
              <div class="max-w-2xl w-full mx-auto">
                <div class="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div class="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div class="flex items-center gap-3 mb-6">
                    <button onClick={() => setView('DASHBOARD')} class="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <div>
                      <h2 class="text-xl font-bold text-white">Interview Configuration</h2>
                      <p class="text-xs text-gray-400">AI will generate questions tailored to these details</p>
                    </div>
                  </div>

                  <form onSubmit={startInterview} class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label class="block text-xs font-semibold text-gray-400 mb-1.5">Target Job Role</label>
                        <select 
                          value={setupForm.role}
                          onChange={(e) => {
                            const selectedRole = e.target.value;
                            let stack = '';
                            if (selectedRole === 'Python Developer') stack = 'Python, Django, SQL';
                            else if (selectedRole === 'Frontend Developer') stack = 'React, JavaScript, Tailwind CSS';
                            else if (selectedRole === 'Full Stack Developer') stack = 'React, Node.js, Express, MongoDB';
                            else if (selectedRole === 'AI/ML Engineer') stack = 'Python, PyTorch, Scikit-Learn, TensorFlow';
                            else if (selectedRole === 'Data Analyst') stack = 'Python, SQL, Tableau, Pandas';
                            
                            setSetupForm({
                              ...setupForm,
                              role: selectedRole,
                              techStack: stack
                            });
                          }}
                          class="block w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white transition-all outline-none"
                        >
                          <option>Python Developer</option>
                          <option>Frontend Developer</option>
                          <option>Full Stack Developer</option>
                          <option>AI/ML Engineer</option>
                          <option>Data Analyst</option>
                        </select>
                      </div>

                      <div>
                        <label class="block text-xs font-semibold text-gray-400 mb-1.5">Difficulty Level</label>
                        <select 
                          value={setupForm.difficulty}
                          onChange={e => setSetupForm({...setupForm, difficulty: e.target.value})}
                          class="block w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white transition-all outline-none"
                        >
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-gray-400 mb-1.5">Tech Stack / Core Skills</label>
                      <input 
                        type="text" 
                        value={setupForm.techStack}
                        onChange={e => setSetupForm({...setupForm, techStack: e.target.value})}
                        placeholder="e.g. React, Node.js, Python, SQL"
                        class="block w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none"
                        required
                      />
                    </div>

                    {/* PDF Resume Upload Section */}
                    <div class="glass-panel p-5 rounded-xl border border-white/5 bg-dark-950/20">
                      <div class="flex items-center justify-between mb-3">
                        <label class="block text-xs font-semibold text-gray-300">Upload PDF Resume</label>
                        <span class="text-[9px] text-brand-400 font-bold px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/15">Supabase Storage</span>
                      </div>
                      
                      <div class="flex flex-col sm:flex-row items-center gap-4">
                        <label class={`flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 active:scale-95 text-white text-xs font-bold rounded-lg cursor-pointer transition-all shrink-0 w-full sm:w-auto ${uploadingResume ? 'opacity-50 pointer-events-none' : ''}`}>
                          <Icon name="fileText" class="w-4 h-4" />
                          <span>{uploadingResume ? 'Uploading...' : 'Choose PDF Resume'}</span>
                          <input 
                            type="file" 
                            accept=".pdf" 
                            onChange={handleResumeUpload} 
                            class="hidden" 
                            disabled={uploadingResume}
                          />
                        </label>

                        {resumeInfo ? (
                          <div class="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-xl w-full overflow-hidden">
                            <div class="flex items-center gap-3 truncate min-w-0 pr-3">
                              <div class="p-2 bg-brand-500/10 text-brand-400 rounded-lg shrink-0">
                                <Icon name="fileText" class="w-4 h-4" />
                              </div>
                              <div class="truncate">
                                <p class="text-xs font-bold text-white truncate">{resumeInfo.name}</p>
                                <p class="text-[10px] text-gray-500 font-mono">{(resumeInfo.size / 1024).toFixed(1)} KB | Uploaded</p>
                              </div>
                            </div>
                            <button 
                              type="button" 
                              onClick={clearResume} 
                              class="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                              title="Delete Resume"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                          </div>
                        ) : (
                          <div class="text-xs text-gray-500 w-full text-center sm:text-left italic">
                            No resume uploaded yet. PDFs only.
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="border-t border-white/5 my-4"></div>

                    <div>
                      <div class="flex items-center justify-between mb-1.5">
                        <label class="block text-xs font-semibold text-gray-400">Or Paste Resume Text (Optional)</label>
                        <span class="text-[10px] text-gray-500">Improves question tailoring</span>
                      </div>
                      <textarea 
                        value={setupForm.resumeText}
                        onChange={e => setSetupForm({...setupForm, resumeText: e.target.value})}
                        placeholder="Paste sections of your resume (experience, projects) here..."
                        rows="4"
                        class="block w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none resize-none"
                      ></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div>
                        <label class="block text-xs font-semibold text-gray-400 mb-1.5">Number of Questions</label>
                        <div class="flex gap-4">
                          {[3, 5, 7].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setSetupForm({...setupForm, numQuestions: num})}
                              class={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                                setupForm.numQuestions === num
                                  ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                                  : 'bg-dark-900 border-white/10 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              {num} Questions
                            </button>
                          ))}
                        </div>
                      </div>

                      <div class="flex items-center gap-3 pt-6 md:pt-0">
                        <input 
                          type="checkbox" 
                          id="voice_output"
                          checked={ttsEnabled}
                          onChange={e => setTtsEnabled(e.target.checked)}
                          class="w-4 h-4 rounded border-white/10 bg-dark-900 text-brand-500 focus:ring-brand-500" 
                        />
                        <label htmlFor="voice_output" class="text-xs font-medium text-gray-400 cursor-pointer">Enable Voice Output (AI speaks questions)</label>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      class="w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-500/25 transition-all duration-150 flex items-center justify-center gap-2"
                    >
                      <Icon name="sparkles" class="w-4 h-4" />
                      <span>Generate & Begin Interview</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {view === 'SESSION' && (
              <div class="max-w-3xl w-full mx-auto space-y-6">
                {/* Timeline Progress & Timers */}
                <div class="glass-panel px-6 py-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-brand-400">QUESTION {currentQuestionIdx + 1} OF {questions.length}</span>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">{questions[currentQuestionIdx].category}</span>
                  </div>

                  {/* Circular Timers Display */}
                  <div class="flex items-center gap-6">
                    {!isQuestionAccepted ? (
                      renderCircularTimer(acceptanceTimerCount, 60, "Accept Question Time", acceptanceTimerCount < 15)
                    ) : (
                      renderCircularTimer(timerCount, getAnswerDuration(), "Time Remaining", timerCount < 15)
                    )}
                  </div>
                </div>

                {/* AI Interviewer Card */}
                <div class={`glass-panel p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-2xl ${
                  isQuestionAccepted && timerCount < 15 ? 'border-red-500/30 shadow-red-500/5' : 'border-white/5'
                }`}>
                  <div class="absolute -top-12 -left-12 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  {/* AI Profile */}
                  <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center relative shadow-lg shadow-brand-500/15 shrink-0">
                        <Icon name="sparkles" class="w-5 h-5 text-white" />
                        <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-dark-950 rounded-full"></span>
                      </div>
                      <div>
                        <h4 class="text-sm font-bold text-white">AI Interviewer</h4>
                        <p class="text-[10px] text-gray-400">PrepGenius Expert Coach</p>
                      </div>
                    </div>
                    {/* Replay voice button */}
                    <div class="flex items-center gap-2">
                      <button
                        onClick={() => speakText(questions[currentQuestionIdx].question_text)}
                        class="p-1.5 rounded-lg text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 transition-all border border-brand-500/15"
                        title="Replay Audio"
                      >
                        <Icon name="volume2" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Speech box */}
                  <div class="p-6 rounded-2xl bg-white/5 border border-white/5 text-base sm:text-lg font-semibold text-white leading-relaxed mb-6">
                    "{questions[currentQuestionIdx].question_text}"
                  </div>

                  {/* Acceptance phase actions */}
                  {!isQuestionAccepted ? (
                    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <button
                        onClick={() => setIsQuestionAccepted(true)}
                        class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-500/25 transition-all duration-150 flex items-center justify-center gap-2 animate-bounce"
                      >
                        <Icon name="check" class="w-4 h-4" />
                        <span>Accept Question</span>
                      </button>
                      <button
                        onClick={() => handleSkipQuestion(false)}
                        class="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2"
                      >
                        <Icon name="volumeX" class="w-4 h-4" />
                        <span>Skip Question</span>
                      </button>
                    </div>
                  ) : (
                    <div class="text-xs font-semibold text-green-400 flex items-center gap-1.5 justify-center">
                      <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
                      Question Accepted. Timer started.
                    </div>
                  )}
                </div>

                {/* Candidate Answering Module */}
                {isQuestionAccepted && (
                  <div class={`glass-panel p-8 rounded-3xl border transition-all duration-300 shadow-2xl relative ${
                    timerCount < 15 ? 'border-red-500/30 shadow-red-500/5' : 'border-white/5'
                  }`}>
                    {/* Mode selector */}
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Candidate Response</h3>
                      <div class="flex gap-2 p-0.5 bg-white/5 border border-white/5 rounded-xl">
                        <button
                          type="button"
                          onClick={() => { stopListening(); setAnswerMode('write'); }}
                          class={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                            answerMode === 'write'
                              ? 'bg-brand-600 text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Write Answer
                        </button>
                        <button
                          type="button"
                          onClick={() => setAnswerMode('speak')}
                          class={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                            answerMode === 'speak'
                              ? 'bg-brand-600 text-white shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Speak Answer
                        </button>
                      </div>
                    </div>

                    {/* Editor Textarea */}
                    <div class="relative">
                      <textarea 
                        value={currentTranscript}
                        onChange={e => setCurrentTranscript(e.target.value)}
                        placeholder={answerMode === 'write' ? "Type your response directly here..." : "Click 'Start Speaking' and state your answer. The live transcript will appear here..."}
                        rows="5"
                        class="block w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-2xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm text-white placeholder-gray-500 transition-all outline-none resize-none leading-relaxed mb-4"
                      ></textarea>
                      {/* Auto saved draft indicator */}
                      {answerMode === 'write' && currentTranscript.trim() && (
                        <div class="absolute bottom-2 right-4 flex items-center gap-1 text-[9px] font-bold text-brand-400">
                          <Icon name="checkCircle" class="w-3.5 h-3.5" />
                          <span>Draft Autosaved</span>
                        </div>
                      )}
                    </div>

                    {/* Word and Character Counters */}
                    {answerMode === 'write' && (
                      <div class="flex items-center gap-4 text-[10px] font-bold text-gray-500 mb-6">
                        <span>📝 Words: {getWordCount(currentTranscript)}</span>
                        <span>🔤 Characters: {currentTranscript.length}</span>
                      </div>
                    )}

                    {/* Microphone Controls / Submits */}
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                      {answerMode === 'speak' ? (
                        <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={toggleListening}
                            disabled={isListening}
                            class="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Start Speaking
                          </button>
                          <button
                            type="button"
                            onClick={stopListening}
                            disabled={!isListening}
                            class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Stop Speaking
                          </button>
                          <button
                            type="button"
                            onClick={handleRetryRecording}
                            class="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all"
                          >
                            Retry Recording
                          </button>
                          
                          <div class="flex items-center gap-2 ml-1">
                            <span class={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-green-500 animate-ping' : 'bg-gray-500'}`}></span>
                            <span class="text-[10px] font-bold text-gray-400">
                              {isListening ? 'Mic Active' : 'Mic Inactive'}
                            </span>
                          </div>

                          {/* Mic Wave Animation */}
                          {isListening && (
                            <div class="flex items-center gap-0.5 h-4 shrink-0">
                              {[1,2,3,4,5].map((idx) => (
                                <span key={idx} class="w-0.5 bg-brand-400 wave-bar rounded-full" style={{ height: `${20 + Math.random() * 80}%`, animationName: 'wave', animationDuration: `${0.8 + Math.random() * 0.5}s`, animationIterationCount: 'infinite' }}></span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <button
                        onClick={() => handleNextQuestion(false)}
                        class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2 ml-auto"
                      >
                        <span>Submit Answer</span>
                        <Icon name="arrowRight" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {view === 'REPORT' && (
              <div class="max-w-4xl w-full mx-auto space-y-8 animate-fade-in pb-12">
                {/* Header Summary Card */}
                <div class="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                  <div class="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div class="space-y-3 text-center md:text-left">
                    <span class="text-[10px] font-bold text-brand-400 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full uppercase tracking-wider">PLACEMENT EVALUATION REPORT</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">{currentInterview.role} Mock Interview</h2>
                    <p class="text-xs text-gray-400">Completed on {new Date(currentInterview.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })} | Difficulty: {currentInterview.difficulty}</p>
                  </div>

                  <div class="flex items-center gap-4 shrink-0 bg-white/5 border border-white/5 px-6 py-4 rounded-2xl">
                    <div class="text-center">
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">OVERALL SCORE</p>
                      <h3 class="text-3xl font-black text-brand-400 mt-1">{currentInterview.score ? currentInterview.score.toFixed(1) : '0.0'}<span class="text-sm text-gray-500 font-medium">/10</span></h3>
                    </div>
                  </div>
                </div>

                {/* Score breakdown metrics and tips */}
                {(() => {
                  const data = currentInterview.feedback ? JSON.parse(currentInterview.feedback) : {};
                  const categories = data.categories || { technical: 75, communication: 80, problem_solving: 70 };
                  const actionableTips = data.actionable_tips || ["Tip 1", "Tip 2", "Tip 3"];
                  
                  return (
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Left: Key Metrics */}
                      <div class="md:col-span-1 space-y-6">
                        <div class="glass-panel p-6 rounded-2xl border border-white/5">
                          <h4 class="text-xs font-bold text-gray-300 uppercase tracking-wider mb-5">Performance Vectors</h4>
                          
                          <div class="space-y-4">
                            {Object.entries(categories).map(([key, val]) => (
                              <div key={key}>
                                <div class="flex items-center justify-between text-xs mb-1.5">
                                  <span class="text-gray-400 font-semibold capitalize">{key.replace('_', ' ')}</span>
                                  <span class="text-white font-bold">{val}%</span>
                                </div>
                                <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                                  <div class="bg-brand-500 h-full rounded-full transition-all duration-500" style={{ width: `${val}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Return to Dashboard */}
                        <button 
                          onClick={() => setView('DASHBOARD')}
                          class="w-full py-3 bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 text-white font-bold rounded-xl text-sm transition-all"
                        >
                          Back to Placement Dashboard
                        </button>
                      </div>

                      {/* Right: Qualitative Feedback Summary & Tips */}
                      <div class="md:col-span-2 space-y-6">
                        <div class="glass-panel p-6 rounded-2xl border border-white/5">
                          <h4 class="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">AI Coach General Feedback</h4>
                          <p class="text-sm text-gray-300 leading-relaxed font-medium">
                            {data.feedback_summary || "Evaluation summary unavailable."}
                          </p>
                        </div>

                        <div class="glass-panel p-6 rounded-2xl border border-white/5">
                          <h4 class="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Actionable Recommendation Tips</h4>
                          <ul class="space-y-3.5">
                            {actionableTips.map((tip, i) => (
                              <li key={i} class="flex gap-3 text-xs leading-relaxed text-gray-300 font-medium">
                                <span class="w-5 h-5 shrink-0 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center font-bold font-mono">{i+1}</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Question by Question Detailed breakdown */}
                <div class="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
                  <h3 class="text-base font-bold text-white mb-2">Question Breakdown Details</h3>
                  
                  <div class="space-y-6">
                    {Object.values(answers).map((ans, idx) => (
                      <div key={idx} class="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                        <div class="flex items-center justify-between gap-4">
                          <div class="flex items-center gap-2.5">
                            <span class="text-xs font-extrabold text-brand-400 font-mono">Q{idx+1}</span>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">{ans.category || 'Core Question'}</span>
                          </div>
                          <span class="text-xs font-black text-brand-400">{ans.score}/10</span>
                        </div>

                        <p class="text-sm font-bold text-white leading-relaxed">"{ans.question_text}"</p>

                        {/* Time Taken & Mode badge */}
                        <div class="flex flex-wrap gap-2 text-[10px] font-bold">
                          <span class="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                            ⏱️ {ans.time_taken || 0}s Taken
                          </span>
                          <span class="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                            ⌨️ Mode: {ans.answer_mode || 'Text'}
                          </span>
                          {ans.is_skipped && (
                            <span class="px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 animate-pulse">
                              ⚠️ Skipped
                            </span>
                          )}
                        </div>

                        {/* Category breakdown progress bars */}
                        {ans.categories && !ans.is_skipped && (
                          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                            {Object.entries(ans.categories).map(([k, v]) => (
                              <div key={k} class="flex flex-col text-center">
                                <span class="text-[8px] font-bold text-gray-400 uppercase tracking-wider">{k.replace('_', ' ')}</span>
                                <span class="text-xs font-black text-white mt-1">{v}/10</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div class="space-y-3 border-t border-white/5 pt-3.5">
                          <div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Answer</p>
                            <p class="text-xs text-gray-300 mt-1 italic font-medium leading-relaxed bg-dark-900/60 p-3 rounded-lg border border-white/5">"{ans.user_answer}"</p>
                          </div>

                          <div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Evaluation Critique</p>
                            <p class="text-xs text-gray-300 mt-1 leading-relaxed font-medium">{ans.feedback}</p>
                          </div>

                          {!ans.is_skipped && (
                            <div>
                              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recommended Model Answer</p>
                              <p class="text-xs text-green-300/90 mt-1 leading-relaxed font-medium bg-green-950/20 p-3 rounded-lg border border-green-500/10">{ans.sample_answer}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Global Configuration Panel Modal */}
      {showConfig && (
        <div class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-md">
          <div class="glass-panel-glow max-w-md w-full p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl animate-scale-up">
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-bold text-white">API Settings & Keys</h3>
                <p class="text-xs text-gray-400 mt-0.5">Stored securely in your local browser storage</p>
              </div>
              <button 
                onClick={() => setShowConfig(false)}
                class="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div class="space-y-5">
              <div class="flex items-center justify-between p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/25">
                <div class="flex items-center gap-2 text-yellow-400">
                  <Icon name="database" class="w-5 h-5 shrink-0" />
                  <div class="flex flex-col">
                    <span class="text-xs font-bold">Offline Simulator Mode</span>
                    <span class="text-[9px] text-yellow-500/80">Lets you try PrepGenius without any keys</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={devMockMode} 
                  onChange={e => setDevMockMode(e.target.checked)}
                  class="w-4 h-4 rounded border-yellow-500 bg-dark-900 text-yellow-500 focus:ring-yellow-500" 
                />
              </div>

              {!devMockMode && (
                <>
                  <div>
                    <label class="block text-xs font-semibold text-gray-400 mb-1.5">Supabase API URL</label>
                    <input 
                      type="text" 
                      value={supabaseUrl}
                      onChange={e => setSupabaseUrl(e.target.value)}
                      placeholder="https://yourproject.supabase.co"
                      class="block w-full px-4 py-2 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 text-xs text-white placeholder-gray-600 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-gray-400 mb-1.5">Supabase Anon Key</label>
                    <input 
                      type="password" 
                      value={supabaseAnonKey}
                      onChange={e => setSupabaseAnonKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      class="block w-full px-4 py-2 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 text-xs text-white placeholder-gray-600 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-gray-400 mb-1.5">Google Gemini API Key</label>
                    <input 
                      type="password" 
                      value={geminiKey}
                      onChange={e => setGeminiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      class="block w-full px-4 py-2 bg-dark-900 border border-white/10 rounded-xl focus:border-brand-500 text-xs text-white placeholder-gray-600 transition-all outline-none"
                    />
                  </div>
                </>
              )}

              <button
                onClick={() => saveConfig(supabaseUrl, supabaseAnonKey, geminiKey, devMockMode)}
                class="w-full py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg"
              >
                Save Environment Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Render React App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

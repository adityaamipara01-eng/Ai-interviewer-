import { createClient } from '@supabase/supabase-js';

// Load environment variables (VITE_ prefix required by Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;
if (supabaseUrl && supabaseAnonKey && /^https?:\/\//.test(supabaseUrl)) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials not set or invalid. Using mock client.');
  // Minimal mock with same interface used in Interview.jsx
  supabase = {
    from: () => ({
      insert: async () => ({ error: null })
    })
  };
}

export { supabase };

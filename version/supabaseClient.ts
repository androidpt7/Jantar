import { createClient } from '@supabase/supabase-js';

// For security reasons, environment variables need to be prefixed with VITE_
// to be exposed to the client-side code.
// Please ensure your environment variables in your hosting provider (e.g., Netlify)
// are named VITE_SUPABASE_URL and VITE_SUPABASE_KEY.
const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  // This error is thrown if the variables are not configured correctly.
  // Make sure VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set in your environment.
  throw new Error("Supabase URL and Key must be defined in environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_KEY)");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

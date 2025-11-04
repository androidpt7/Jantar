import { createClient } from '@supabase/supabase-js';

// The execution environment provides environment variables through `process.env`.
// The 'VITE_' prefix is specific to Vite's dev server and is not available in this environment.
// We are using the standard variable names `SUPABASE_URL` and `SUPABASE_KEY`.
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  // This error will be thrown if the variables are not configured correctly in your hosting environment.
  // Please double-check that SUPABASE_URL and SUPABASE_KEY are set.
  throw new Error("Supabase URL and Key must be defined in environment variables (SUPABASE_URL, SUPABASE_KEY)");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

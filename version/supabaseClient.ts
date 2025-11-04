import { createClient } from '@supabase/supabase-js';

// The execution environment provides environment variables through `process.env`.
// Using `import.meta.env` is specific to Vite's dev server and build process,
// and it seems it's not available here, causing the application to crash.
// We are reverting to `process.env` which is the standard way this platform
// exposes secrets.
const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  // This error will be thrown if the variables are not configured correctly in your hosting environment (e.g., Netlify).
  // Please double-check that VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set.
  throw new Error("Supabase URL and Key must be defined in environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_KEY)");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

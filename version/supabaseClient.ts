// Fix: Add a triple-slash directive to include Vite's client types. This provides the type definitions for `import.meta.env` and fixes the error about 'env' not existing on 'ImportMeta'.
/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

// In a Vite environment, environment variables are exposed on the `import.meta.env` object.
// For security reasons, only variables prefixed with `VITE_` are exposed to the client-side code.
// Please ensure your environment variables in your hosting provider (e.g., Netlify)
// are named VITE_SUPABASE_URL and VITE_SUPABASE_KEY.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  // This error is thrown if the variables are not configured correctly.
  // Make sure VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set in your environment
  // and that you have redeployed your application after setting them.
  throw new Error("Supabase URL and Key must be defined in environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_KEY)");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

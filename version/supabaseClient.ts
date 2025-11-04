// Fix: The triple-slash directive `/// <reference types="vite/client" />` was causing a "Cannot find type definition" error.
// This is often due to project setup issues. The directive has been removed and a type assertion `(import.meta as any)`
// is used as a workaround to resolve the type-checking errors for Vite environment variables.
import { createClient } from '@supabase/supabase-js';

// In a Vite environment, environment variables are exposed on the `import.meta.env` object.
// For security reasons, only variables prefixed with `VITE_` are exposed to the client-side code.
// Please ensure your environment variables in your hosting provider (e.g., Netlify)
// are named VITE_SUPABASE_URL and VITE_SUPABASE_KEY.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  // This error is thrown if the variables are not configured correctly.
  // Make sure VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set in your environment
  // and that you have redeployed your application after setting them.
  throw new Error("Supabase URL and Key must be defined in environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_KEY)");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

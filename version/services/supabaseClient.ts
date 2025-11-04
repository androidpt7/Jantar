
import { createClient } from '@supabase/supabase-js';

// Fix: Added @ts-ignore to suppress TypeScript error for Vite environment variable.
// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Fix: Added @ts-ignore to suppress TypeScript error for Vite environment variable.
// @ts-ignore
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

let configError: string | null = null;
if (!supabaseUrl || !supabaseKey) {
  configError = "As credenciais do Supabase (VITE_SUPABASE_URL e VITE_SUPABASE_KEY) não foram encontradas.";
  console.error(configError);
}

// @ts-ignore
export const supabase = configError ? null : createClient(supabaseUrl, supabaseKey);
export { configError };
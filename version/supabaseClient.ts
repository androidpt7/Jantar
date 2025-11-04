import { createClient } from '@supabase/supabase-js';

// Em projetos Vite, as variáveis de ambiente do lado do cliente são acedidas através de `import.meta.env`
// FIX: Cast `import.meta` to `any` to access the `env` property. This is a workaround for the TypeScript error "Property 'env' does not exist on type 'ImportMeta'", which occurs when Vite's client types are not configured.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be defined in environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_KEY)");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

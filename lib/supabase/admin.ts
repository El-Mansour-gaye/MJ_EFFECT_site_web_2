import { createClient } from '@supabase/supabase-js'

// This function creates a new Supabase client for server-side use.
// It should be called within your API routes or server-side functions.
export function createSupabaseAdmin() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!supabaseUrl) {
      throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
    }
    if (!supabaseServiceKey) {
      throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY");
    }

    if (supabaseServiceKey === process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is the same as NEXT_PUBLIC_SUPABASE_ANON_KEY. RLS will not be bypassed.");
    }

    // This client uses the service role key and should never be exposed to the browser.
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
}

import { createClient } from '@supabase/supabase-js'

// This function creates a new Supabase client for server-side use.
// It should be called within your API routes or server-side functions.
export function createSupabaseAdmin() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
    }
    if (!supabaseServiceKey) {
      throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY");
    }

    // Diagnostic: Log key information (masked) to help user identify the key type
    console.log(`[Supabase Admin] Initializing with key: ${supabaseServiceKey.substring(0, 10)}... (length: ${supabaseServiceKey.length})`);

    // This client uses the service role key and should never be exposed to the browser.
    // We disable autoRefreshToken and persistSession because this is a server-side client.
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
}

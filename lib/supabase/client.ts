import { createClient } from '@supabase/supabase-js'

// This function creates a new Supabase client for browser-side use.
// It should be called in your components or client-side scripts.
export function createSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase URL and anonymous key are required.");
    }

    // This client uses the public anonymous key and is safe to expose to users.
    return createClient(supabaseUrl, supabaseAnonKey);
}

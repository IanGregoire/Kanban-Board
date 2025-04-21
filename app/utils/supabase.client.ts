import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseClient should only be called on the client");
  }

  if (!client) {
    const supabaseUrl = window.ENV.SUPABASE_URL;
    const supabaseAnonKey = window.ENV.SUPABASE_ANON_KEY;
    client = createClient(supabaseUrl, supabaseAnonKey);
  }

  return client;
}
export function safeGetSupabaseClient() {
    if (typeof window === "undefined" || !window.ENV?.SUPABASE_URL) {
      return null;
    }
  
    if (!client) {
      client = createClient(window.ENV.SUPABASE_URL, window.ENV.SUPABASE_ANON_KEY);
    }
  
    return client;
  }
  
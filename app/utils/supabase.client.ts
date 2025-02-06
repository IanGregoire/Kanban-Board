// utils/supabase.client.ts
import { createClient } from "@supabase/supabase-js";

// Use environment variables exposed via window.ENV
const supabaseUrl = window.ENV.SUPABASE_URL;
const supabaseAnonKey = window.ENV.SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

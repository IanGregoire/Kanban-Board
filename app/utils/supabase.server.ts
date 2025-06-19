import { redirect } from '@remix-run/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function requireUser(request: Request) { 
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw redirect("/login");
  return user;
}

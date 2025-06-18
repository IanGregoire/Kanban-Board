import { ActionFunction, redirect } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";

export const action: ActionFunction = async () => {
  await supabase.auth.signOut();
  return redirect("/login");
};

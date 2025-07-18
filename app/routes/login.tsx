import { json, redirect, type ActionFunction, MetaFunction } from  '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { supabase } from '~/utils/supabase.server'; 
import PublicLayout from "~/components/PublicLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "Log In - Kanban Board" },
    { name: "description", content: "Log in to manage your projects with the Kanban board." },
  ];
};

export const action: ActionFunction = async({ request }) => {
    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if(error) {
        return json({ error: error.message }, { status: 400 });
    }

    return redirect('/dashboard');
}

export default function Login() {
    const actionData = useActionData<typeof action>();

    return (        
      <PublicLayout>
        <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Login</h1>

          <Form method="post" className="space-y-4">
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                required 
                autoFocus
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
                />
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
                />
              {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
              Log In
              </button>
          </Form>

          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
              Forgot Password?{" "}
              <Link to="/recoverPassword" className="text-blue-600 hover:underline">Recover Password</Link>
          </p>
        </div>
      </PublicLayout>
  );
}
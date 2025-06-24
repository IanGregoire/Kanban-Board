import { json, redirect, type ActionFunction } from  '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { supabase } from '~/utils/supabase.server'; 

export const action: ActionFunction = async({ request }) => {
    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if(error) {
        return json({ error: error.message }, { status: 400 });
    }

    return redirect('/');
}

export default function Login() {
    const actionData = useActionData<typeof action>();

    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <Form method="post" className="space-y-4">
            <input name="email" type="email" placeholder="Email" required className="w-full p-2 text-black border rounded" />
            <input name="password" type="password" placeholder="Password" required className="w-full p-2 text-black border rounded" />
            {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Log In
            </button>
        </Form>

        <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
        <p className="mt-4 text-center text-sm">
            Forgot Password?{" "}
            <Link to="/recoverPassword" className="text-blue-600 hover:underline">Recover Password</Link>
        </p>
      </div>
  );
}
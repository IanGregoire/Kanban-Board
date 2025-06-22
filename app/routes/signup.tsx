import { Form, Link, useActionData } from '@remix-run/react';
import { json, redirect, type ActionFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';
import { createUserSession } from '~/utils/session.server';

export const action: ActionFunction = async({ request }) => {
    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if(error) { 
        return json({ error: error.message }, { status: 400 });
    }

    return redirect('/')
}

export default function SignUp() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

          <Form method="post" className="space-y-4">
            <input name="email" type="email" placeholder="Email" required className="w-full p-2 text-black border rounded" />
            <input name="password" type="password" placeholder="Password" required className="w-full p-2 text-black border rounded" />
            {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Sign Up
            </button>
          </Form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
    )
}
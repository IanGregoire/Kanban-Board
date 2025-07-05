import { Form, Link, useActionData, MetaFunction } from '@remix-run/react';
import { json, redirect, type ActionFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up - Kanban Board" },
    { name: "description", content: "Create an account to manage your projects with the Kanban board." },
  ];
};


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
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Sign Up</h1>

          <Form method="post" className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              autoFocus
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                Sign Up
            </button>
          </Form>

          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">Log in</Link>
          </p>
        </div>
    )
}
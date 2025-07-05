import { Form, Link, useActionData } from '@remix-run/react';
import { json, redirect, type ActionFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';

export const action: ActionFunction = async({ request }) => {
    const form = await request.formData();
    const email = form.get('email') as string;
    
    let { data, error } = await supabase.auth.resetPasswordForEmail(email)

    if(error) { 
        return json({ error: error.message }, { status: 400 });
    }

    return redirect('/')
}

export default function RecoverPassword() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Recover Password</h1>

          <Form method="post" className="space-y-4">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              required 
              autoFocus
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
            />
            {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
            {actionData?.success && (
              <p className="text-green-500 text-sm">Check your email for reset instructions.</p>
            )}
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors">
                Recover Password
            </button>
          </Form>

          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
    )
}
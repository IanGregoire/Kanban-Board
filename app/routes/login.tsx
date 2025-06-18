import { json, redirect, type ActionFunction } from  '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
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
    <Form method="post" className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input name="email" type="email" placeholder="Email" required className="w-full border p-2" />
      <input name="password" type="password" placeholder="Password" required className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
    </Form>
  );
}
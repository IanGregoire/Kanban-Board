import { json, redirect, type LoaderFunction, type ActionFunction } from '@remix-run/node';
import { useActionData, useLoaderData, Form, MetaFunction } from '@remix-run/react';
import { supabase, requireUser } from '~/utils/supabase.server';

export const meta: MetaFunction = () => {
  return [
    { title: "Settings - Kanban Board" },
    { name: "description", content: "Manage Kanban board account information." },
  ];
};

export const loader: LoaderFunction = async({ request }) => {
    const user = await requireUser(request); // Redirect if not logged in
    return json({ email: user.email });
}

export const action: ActionFunction = async({ request }) => {
    const user = await requireUser(request);
    const form = await request.formData();

    const intent = form.get('intent');
    const email = form.get('email')?.toString();
    const password = form.get('password')?.toString();

    if(!intent) return json({ error: 'Missing Intent' }, { status: 400 });

    if(intent === 'update-email') {
        const { error } = await supabase.auth.updateUser({ email });
        if (error) return json({ error: error.message }, { status: 400 });
        return json({ success: "Email Updated"});
    }

    if(intent === 'update-password') {
        if(!password || password.length < 6) {
            return json({ error: "Password must be at least 6 characters"}, { status: 400 });
        }
        const { error } = await supabase.auth.updateUser({ password });
        if (error) return json({ error: error.message }, { status: 400 });
        return json({ success: "Password Updated"});
    }

    return json({ error: "Invalid action"}, { status: 400 });
}

export default function Settings() {
    const actionData = useActionData<typeof action>();
    const { email } = useLoaderData<typeof loader>();

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">User Settings</h1>
             <p className="text-gray-800 dark:text-gray-300 mb-4">
                Current email: <span className="font-semibold">{email}</span>
            </p>

            <Form method="post" className="space-y-4 mb-8">
                <input type="hidden" name="intent" value="update-email" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Email</label>
                <input
                type="email"
                name="email"
                required
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
                Update Email
                </button>
            </Form>

            <Form method="post" className="space-y-4">
                <input type="hidden" name="intent" value="update-password" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                <input
                type="password"
                name="password"
                required
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded" type="submit">
                Update Password
                </button>
            </Form>

            {actionData?.error && (
                <p className="text-red-500 text-sm mt-4">{actionData.error}</p>
            )}
            {actionData?.success && (
                <p className="text-green-500 text-sm mt-4">{actionData.success}</p>
            )}
            <a
                href="/"
                className="block mt-6 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
                ← Back to Dashboard
            </a>
        </div>
    );
}
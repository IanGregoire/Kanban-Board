import { json, redirect, type LoaderFunction, type ActionFunction } from '@remix-run/node';
import { useActionData, useLoaderData, Form, MetaFunction } from '@remix-run/react';
import TopBar from '~/components/TopBar';
import { supabase, requireUser } from '~/utils/supabase.server';

export const meta: MetaFunction = () => {
  return [
    { title: "Settings - Kanban Board" },
    { name: "description", content: "Manage Kanban board account information." },
  ];
};

export const loader: LoaderFunction = async({ request }) => {
    const user = await requireUser(request); // Redirect if not logged in
    const url = new URL(request.url);
    const projectNameFromUrl = url.searchParams.get("projectName");

    let { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order('id');

    const selectedProject =
      projects!.find((p) => p.name === projectNameFromUrl) || projects![0];
      
    return json({ email: user.email, projects, selectedProject });
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
    const { email, projects, selectedProject } = useLoaderData<typeof loader>();

    let redirectUrl = `/dashboard?projectName=${encodeURIComponent(projects[0].name!)}`

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="border-b border-gray-300 dark:border-gray-700">
                <TopBar
                email={email}
                selectedProjectId={selectedProject.id} 
                selectedProjectName={selectedProject.name} 
                projects={projects} 
                setShowDeleteModal={() => false}
                setShowProjectModal={() => false}
                setShowNewTaskModal={() => false}
                />
            </div>

            <main className="max-w-lg mx-auto my-10 px-4 sm:px-6 py-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">User Settings</h1>

                <section aria-labelledby="current-email-label" className="mb-6">
                <p id="current-email-label" className="text-gray-800 dark:text-gray-300">
                    Current email: <span className="font-semibold">{email}</span>
                </p>
                </section>

                {/* Update Email Form */}
                <Form method="post" className="space-y-4 mb-8" role="form" aria-labelledby="email-update-label">
                <input type="hidden" name="intent" value="update-email" />
                <label htmlFor="email" id="email-update-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Update Email
                </button>
                </Form>

                {/* Update Password Form */}
                <Form method="post" className="space-y-4" role="form" aria-labelledby="password-update-label">
                <input type="hidden" name="intent" value="update-password" />
                <label htmlFor="password" id="password-update-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                    Update Password
                </button>
                </Form>

                {/* Action feedback */}
                {(actionData?.error || actionData?.success) && (
                <div className="mt-4" aria-live="polite">
                    {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
                    {actionData?.success && <p className="text-green-500 text-sm">{actionData.success}</p>}
                </div>
                )}

                {/* Navigation back */}
                <a
                href={redirectUrl}
                className="block mt-6 text-sm text-center text-blue-600 hover:underline dark:text-blue-400"
                >
                ← Back to Dashboard
                </a>
            </main>
        </div>
    );
}
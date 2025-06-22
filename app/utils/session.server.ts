import { createCookieSessionStorage, redirect } from "@remix-run/node";

// const sessionSecret = process.env.SESSION_SECRET;
const sessionSecret = "process.env.SESSION_SECRET";
const storage = createCookieSessionStorage({
    cookie: {
        name: 'sb_session',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    },
});

export async function createUserSession(token: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set('access_token', token);
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    });
}
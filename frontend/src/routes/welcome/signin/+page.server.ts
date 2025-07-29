import type { Actions } from "@sveltejs/kit";
import { error, fail, isRedirect, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return fail(400, {
        email,
        error: true,
        message: 'email e password sono necessarie'
      });
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        return fail(response.status, {
          email,
          incorrect: true,
          message: errorData.error || errorData.message || 'credenziali non valide'
        });
      }

      const result = await response.json();
      const token = result.access_token || result.token;

      if (token) {
        cookies.set('access_token', token, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7
        });
      }

      throw redirect(308, '/home');
    } catch (e) {
      if (isRedirect(e)) {
        throw e;
      }

      return fail(500, {
        email,
        error: true,
        message: 'errore del server; ritenta'
      });
    }
  }
}

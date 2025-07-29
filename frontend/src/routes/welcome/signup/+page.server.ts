import type { Actions } from "@sveltejs/kit";
import { fail, isRedirect, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!name || !email || !password) {
      return fail(400, {
        email,
        error: true,
        message: 'nome, email e password sono necessari'
      });
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        return fail(response.status, {
          email,
          error: true,
          message: errorData.error || errorData.message || 'errore durante la registrazione'
        });
      }

      throw redirect(308, '/welcome/signin');
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

import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals, url, fetch }) => {
  const user = locals.user;

  const publicRoutes = ['/welcome', '/welcome/login', '/welcome/signup'];
  const isPublicRoute = publicRoutes.some(route => url.pathname.startsWith(route));

  if (!user && !isPublicRoute) {
    throw redirect(302, '/welcome/signup');
  }

  if (user && isPublicRoute) {
    throw redirect(302, '/home');
  }

  return {
    user
  };
}

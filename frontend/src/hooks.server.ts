import type { Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('access_token');

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      event.locals.user = decoded;
    } catch (e) {
      event.cookies.delete('access_token', { path: '/' });
    }
  }

  return resolve(event);
}
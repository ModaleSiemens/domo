// import type { Handle } from "@sveltejs/kit";
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET as string;

// export const handle: Handle = async ({ event, resolve}) => {
//   const token = event.cookies.get('access_token');

//   if(token) {
//     try {
//       const user = jwt.verify(token, JWT_SECRET);
//       event.locals.user = user;
//     } catch (e) {
//       console.log('Invalid token', e);
//     }
//   }

//   return resolve(event);
// }

import { user } from "$lib/stores/auth";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  const token = event.cookies.get('access_token');

  if (token) {
    try {
      const response = await fetch('http://localhost:8000/api/users/me', {
        headers: {
          'Cookie': `access_token=${token}`
        }
      });

      if (response.ok) {
        const user_data = await response.json();
        event.locals.user = user_data;
      }
    } catch (e) {
      console.error('Authentication check failed: ', e);
      event.cookies.delete('access_token', { path: '/' });
    }
  }

  return resolve(event);
}
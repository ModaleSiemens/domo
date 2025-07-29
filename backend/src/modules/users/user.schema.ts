import { Static, Type } from "@fastify/type-provider-typebox"

export const createUserSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  name: Type.String()
}, { $id: 'CreateUserSchema' });

export type CreateUserInput = Static<typeof createUserSchema>;

export const createUserResponseSchema = Type.Object({
  id: Type.String(),
  email: Type.String({ format: 'email' }),
  name: Type.String()
}, { $id: 'CreateUserResponseSchema' });

export const loginSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 })
}, { $id: 'LoginSchema' });

export type LoginUserInput = Static<typeof loginSchema>;

export const loginResponseSchema = Type.Object({
  accessToken: Type.String()
}, { $id: 'LoginResponseSchema' });

export const userSchemas = [
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema
];
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes } from "./modules/users/user.route";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { userSchemas } from "./modules/users/user.schema";
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import cors from "@fastify/cors";
import { handler } from '../../frontend/build/handler.js'
import middie from '@fastify/middie'
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });

const app = Fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  })
})

for (let schema of [...userSchemas]) {
  app.addSchema(schema);
}

app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true
})

app.register(userRoutes, { prefix: 'api/users' });

app.register(fjwt, {
  secret: process.env.JWT_SECRET as string
});

app.register(fCookie, {
  secret: process.env.JWT_SECRET as string,
  hook: "preHandler"
});

app.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;

    if (!token) {
      return reply.status(401).send({ message: 'authentication required' });
    }
    const decoded = req.jwt.verify<FastifyJWT['user']>(token);
    req.user = decoded;
  }
)

async function main() {
  await app.register(middie);

  app.addHook('preHandler', (request, reply, done) => {
    if (request.url?.startsWith('/api')) {
      request.jwt = app.jwt;
    }
    done();
  });

  app.use((req, res, next) => {
    if (req.url?.startsWith('/api')) {
      return next();
    } else {
      return handler(req, res, next);
    }
  });

  await app.listen({
    port: 8000,
    host: '0.0.0.0'
  })
}

main();
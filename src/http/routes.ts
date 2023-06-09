import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "../http/controllers/profile";
import { verifyJwt } from "./middlewares/verify-twt";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)

    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: [verifyJwt] }, profile)
}
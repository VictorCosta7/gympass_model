import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-twt";

import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";


export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register)

    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: [verifyJwt] }, profile)
}   
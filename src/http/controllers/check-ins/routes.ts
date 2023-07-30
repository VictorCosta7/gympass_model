import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-twt";

import { history } from "./history";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/check-ins/hystory', history)
}   
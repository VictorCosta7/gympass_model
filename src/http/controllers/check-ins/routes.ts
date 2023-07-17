import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-twt";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/check-ins/hystory', his)
}   
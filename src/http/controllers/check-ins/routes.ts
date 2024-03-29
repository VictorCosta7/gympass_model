import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-twt";

import { history } from "./history";
import { metrics } from "./metrics";
import { create } from "domain";
import { validade } from "./validate";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/check-ins/hystory', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/gyms/:gymId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] }, validade)
}   
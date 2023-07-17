import { FastifyRequest, FastifyReply } from "fastify"

import { z } from "zod"

import { makeValidatedCheckInUseCase } from "@/http/use-cases/factories/make-validated-check-in-use-case"

export async function validade(request: FastifyRequest, reply: FastifyReply) {
    const validadeCheckInsParamsSchema = z.object({
        checkInId: z.string().uuid()
    })

    const { checkInId } = validadeCheckInsParamsSchema.parse(request.params)

    const validadeCheckInsUseCase = makeValidatedCheckInUseCase()

    await validadeCheckInsUseCase.execute({
        checkInId
    })

    return reply.status(204).send()
}
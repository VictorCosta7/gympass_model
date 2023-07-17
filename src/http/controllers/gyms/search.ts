import { FastifyRequest, FastifyReply } from "fastify"

import { z } from "zod"

import { makeSearchGymsUseCase } from "@/http/use-cases/factories/make-search-gyms-use-case"

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const serchGymQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { query, page } = serchGymQuerySchema.parse(request.query)

    const searchGymUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymUseCase.execute({
        query,
        page
    })


    return reply.status(201).send({
        gyms
    })
}
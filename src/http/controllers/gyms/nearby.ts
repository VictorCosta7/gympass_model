import { FastifyRequest, FastifyReply } from "fastify"

import { z } from "zod"

import { makeFetchNearbyGymUseCase } from "@/http/use-cases/factories/make-fetch-nearby-gym-use-case"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const serchNearbyGymQuerySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = serchNearbyGymQuerySchema.parse(request.body)

    const fetchNearbyGymsUseCase = makeFetchNearbyGymUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })


    return reply.status(201).send({
        gyms
    })
}
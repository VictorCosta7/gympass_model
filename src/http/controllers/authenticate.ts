import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository"
import { AuthenticateUSeCase } from "../use-cases/authenticate"
import { InvalidCredentialsErrors } from "../use-cases/errors/invalid-credentials-errors"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUSeCase(prismaUsersRepository)

        await authenticateUseCase.execute({
            email,
            password
        })
    }
    catch (err) {
        if (err instanceof InvalidCredentialsErrors) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send()
}
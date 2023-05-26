import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository"
import { AuthenticateUSeCase } from "../authenticate"

export function makeAuthentiacteUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUSeCase(prismaUsersRepository)

    return authenticateUseCase
}
import { PrismaGymsRepository } from "@/http/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-in"
import { PrismaCheckInsRepository } from "@/http/repositories/prisma/prisma-check-ins-repository"

export function makeMakeCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()

    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}
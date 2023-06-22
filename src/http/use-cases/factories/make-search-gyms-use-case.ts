import { PrismaCheckInsRepository } from "@/http/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUseCase } from "../validate-check-in"
import { PrismaGymsRepository } from "@/http/repositories/prisma/prisma-gyms-repository"
import { SearchGymUseCase } from "../search-gyms"

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymUseCase(gymsRepository)

    return useCase
}
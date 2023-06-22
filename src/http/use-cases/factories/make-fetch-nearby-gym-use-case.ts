
import { PrismaGymsRepository } from "@/http/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymUseCase } from "../fetch-nearby-gym"

export function makeFetchNearbyGymUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymUseCase(gymsRepository)

    return useCase
}
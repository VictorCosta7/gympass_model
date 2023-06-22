import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrismaCheckInsRepository } from "@/http/repositories/prisma/prisma-check-ins-repository"

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";


interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCounts: number
}

export class GetUserMetricsUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCounts = await this.checkInsRepository.countByUseId(userId)

        return {
            checkInsCounts
        }
    }
}
import { Gym } from "@prisma/client"
import { GymsRepository } from "../repositories/gyms-repository"

interface FatchNearbyGymUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FatchNearbyGymUseCaseResponse {
    gyms: Gym[]
}

export class FatchNearbyGymUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        userLatitude,
        userLongitude
    }: FatchNearbyGymUseCaseRequest): Promise<FatchNearbyGymUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms
        }
    }
}

import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-errors";
import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { GymsRepository } from "../repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatutude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) { }

    async execute({ userId, gymId, userLatutude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatutude, longitude: userLongitude },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber()
            }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error()
        }

        const checkInOnSameday = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if (checkInOnSameday) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn
        }
    }
}
import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-errors";
import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";

interface CheckInUseCaseResponseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({ userId, gymId }: CheckInUseCaseResponseRequest): Promise<CheckInUseCaseResponseResponse> {
        const checkInOnSameday = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if (checkInOnSameday) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn
        }
    }
}
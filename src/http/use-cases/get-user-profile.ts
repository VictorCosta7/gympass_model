import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-errors";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new InvalidCredentialsErrors()
        }

        return {
            user
        }
    }
}
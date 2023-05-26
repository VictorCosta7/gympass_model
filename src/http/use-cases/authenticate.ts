import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-errors";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUSeCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsErrors()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsErrors()
        }

        return {
            user
        }
    }
}
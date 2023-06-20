import { hash } from "bcryptjs"
import { UserAlredyExistsError } from "./errors/user-alredy-exists-error"
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "../repositories/gyms-repository"

interface SearchGymUseCaseRequest {
    query: string
    page: number
}
interface RegisterUseCaseResponse {
    gyms: Gym[]
}
export class SearchGymUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        query,
        page
    }: SearchGymUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const gyms = await this.gymsRepository.searchMany(
            query,
            page
        )

        return {
            gyms
        }
    }
}

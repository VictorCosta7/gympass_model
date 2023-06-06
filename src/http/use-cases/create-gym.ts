import { hash } from "bcryptjs"
import { UserAlredyExistsError } from "./errors/user-alredy-exists-error"
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "../repositories/gyms-repository"

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}
interface RegisterUseCaseResponse {
    gym: Gym
}
export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude
    }: CreateGymUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym
        }
    }
}

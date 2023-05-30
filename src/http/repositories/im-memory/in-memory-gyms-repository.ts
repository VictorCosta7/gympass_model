import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class inMemoryUserRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const user = this.items.find(item => item.id === id)

        if (!user) {
            return null
        }

        return user
    }
}
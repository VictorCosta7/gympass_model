import { User, Prisma, CheckIn } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";

export class inMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
}

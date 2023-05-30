import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class inMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOftheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkinInOnSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOftheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && isOnSameDate
        })

        if (!checkinInOnSameDate) {
            return null
        }

        return checkinInOnSameDate
    }

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

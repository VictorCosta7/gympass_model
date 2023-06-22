import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/im-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('shold be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('shold not be able to validate the an inexistent check-in', async () => {
        expect(() => sut.execute({
            checkInId: "inexistent-check-in-id"
        }))
            .rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('shold not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 11, 13, 17, 45))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        expect(() => expect({
            checkInId: createdCheckIn.id
        }).rejects.toBeInstanceOf(Error)
        )
    })
})
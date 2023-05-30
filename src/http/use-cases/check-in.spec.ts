import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryCheckInsRepository } from '../repositories/im-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new inMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('shold be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        console.log(checkIn.created_at)

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('shold not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 10, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(async () => {
            await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01'
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('shold be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 10, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        vi.setSystemTime(new Date(2023, 0, 21, 10, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})
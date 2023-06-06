import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/im-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '../repositories/im-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Victor gym',
            description: '',
            phone: '',
            latitude: -5.1952044,
            longitude: -37.350665
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('shold be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1952044,
            userLongitude: -37.350665
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('shold not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 10, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1952044,
            userLongitude: -37.350665
        })

        await expect(async () => {
            await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -5.1952044,
                userLongitude: -37.350665
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('shold be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 10, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1952044,
            userLongitude: -37.350665
        })

        vi.setSystemTime(new Date(2023, 0, 21, 10, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1952044,
            userLongitude: -37.350665
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('shold not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Victor gym',
            description: '',
            phone: '',
            latitude: new Decimal(-5.1392621),
            longitude: new Decimal(-37.344601)
        })

        await expect(async () => {
            await sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -5.1952044,
                userLongitude: -37.350665
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
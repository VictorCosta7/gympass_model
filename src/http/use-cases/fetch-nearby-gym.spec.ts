import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/im-memory/in-memory-gyms-repository'
import { FetchNearbyGymUseCase } from './fetch-nearby-gym'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymUseCase(gymsRepository)
    })

    it('shold be to fatch nearby gyms', async () => {
        await gymsRepository.create({
            title: "Near Gym",
            description: null,
            phone: null,
            latitude: -5.1952044,
            longitude: -37.350665
        })

        await gymsRepository.create({
            title: "Far Gym",
            description: null,
            phone: null,
            latitude: -4.9469731,
            longitude: -37.1572113
        })

        const { gyms } = await sut.execute({
            userLatitude: -5.1952044,
            userLongitude: -37.350665
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Near Gym" }),
        ])
    })
})
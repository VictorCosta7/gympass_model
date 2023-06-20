import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/im-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)
    })

    it('shold be able search for gyms', async () => {
        await gymsRepository.create({
            title: "Frangos Gym",
            description: null,
            phone: null,
            latitude: -5.1952044,
            longitude: -37.350665
        })

        await gymsRepository.create({
            title: "Grilos Gym",
            description: null,
            phone: null,
            latitude: -5.1952044,
            longitude: -37.350665
        })

        const { gyms } = await sut.execute({
            query: "Frangos",
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Frangos Gym" }),
        ])
    })

    it('shold be able fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++)
            await gymsRepository.create({
                title: `Frangos Gym ${i}`,
                description: null,
                phone: null,
                latitude: -5.1952044,
                longitude: -37.350665
            })

        const { gyms } = await sut.execute({
            query: "Frangos",
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Frangos Gym 21" }),
            expect.objectContaining({ title: "Frangos Gym 22" })
        ])
    })
})
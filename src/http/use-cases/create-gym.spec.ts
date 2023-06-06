import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/im-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('shold be able create gym', async () => {
        const { gym } = await sut.execute({
            title: 'Victor Gym',
            description: null,
            phone: null,
            latitude: -5.1952044,
            longitude: -37.350665
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/im-memory/in-memory-checkins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Fetch User check-in History Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('shold be able to check-ins count from metrics', async () => {
        await checkInsRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        })

        await checkInsRepository.create({
            gym_id: "gym-02",
            user_id: "user-01"
        })

        const { checkInsCount } = await sut.execute({
            userId: "user-01",
        })

        expect(checkInsCount).toEqual(2)
    })
})
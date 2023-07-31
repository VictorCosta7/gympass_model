import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('shold be able list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Frangos Gym",
                description: "Alguma descrição aqui",
                phone: null,
                latitude: -5.1952044,
                longitude: -37.350665
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Grilos Gym",
                description: "Alguma descrição aqui",
                phone: null,
                latitude: -4.9469731,
                longitude: -37.1572113
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                latitude: -5.1952044,
                longitude: -37.350665
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Grilos Gym",
            })
        ])
    })
})
import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('shold be able to create a gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const profileResponse = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Frangos Gym",
                description: "Alguma descrição aqui",
                phone: null,
                latitude: -5.1952044,
                longitude: -37.350665
            })

        console.log(profileResponse)

        expect(profileResponse.statusCode).toEqual(201)
    })
})
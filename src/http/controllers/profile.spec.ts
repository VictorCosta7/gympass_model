import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('shold be able get user profile', async () => {
        await request(app.server).post('/users').send({
            name: 'Ricardo',
            email: 'ricardo@rmail.com',
            password: '123456'
        })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'ricardo@rmail.com',
            password: '123456'
        })

        const { token } = authResponse.body

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'ricardo@rmail.com'
            })
        )
    })
})
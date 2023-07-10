import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Registe (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('shold be able to register', async () => {
        const response = await request(app.server).post('/users').send({
            name: 'ricardo',
            email: 'ricardo@rmail.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(201)
    })
})
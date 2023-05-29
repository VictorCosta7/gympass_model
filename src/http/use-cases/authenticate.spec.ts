import { beforeEach, describe, expect, it } from "vitest"
import { inMemoryUserRepository } from "../repositories/im-memory/in-memory-users-repository"
import { AuthenticateUSeCase } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-errors"

let usersRepository: inMemoryUserRepository
let sut: AuthenticateUSeCase

describe('Authenticate Use case', () => {
    beforeEach(() => {
        usersRepository = new inMemoryUserRepository()
        sut = new AuthenticateUSeCase(usersRepository)
    })

    it('shold be able to authenticate', async () => {
        await usersRepository.create({
            name: 'Victor Rodirgo',
            email: 'victor@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'victor@email.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('shold not be able to authenticate with wrong email', async () => {
        await usersRepository.create({
            name: 'Victor Rodirgo',
            email: 'victor@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'victor@email.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('shold not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            email: 'victor@emil.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsErrors)
    })


    it('shold not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'Victor Rodirgo',
            email: 'victor@email.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => sut.execute({
            email: 'victor@emil.com',
            password: '1234456'
        })).rejects.toBeInstanceOf(InvalidCredentialsErrors)
    })
})  
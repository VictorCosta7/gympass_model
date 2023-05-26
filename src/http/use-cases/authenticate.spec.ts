import { describe, expect, it } from "vitest"
import { inMemoryUserRepository } from "../repositories/im-memory/in-memory-users-repository"
import { AuthenticateUSeCase } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-errors"

describe('Authenticate Use case', () => {
    it('shold be able to authenticate', async () => {
        const usersRepository = new inMemoryUserRepository()
        const sut = new AuthenticateUSeCase(usersRepository)

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
        const usersRepository = new inMemoryUserRepository()
        const sut = new AuthenticateUSeCase(usersRepository)

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
        const usersRepository = new inMemoryUserRepository()
        const sut = new AuthenticateUSeCase(usersRepository)

        expect(() => sut.execute({
            email: 'victor@emil.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsErrors)
    })


    it('shold not be able to authenticate with wrong password', async () => {
        const usersRepository = new inMemoryUserRepository()
        const sut = new AuthenticateUSeCase(usersRepository)

        await usersRepository.create({
            name: 'Victor Rodirgo',
            email: 'victor@email.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => sut.execute({
            email: 'victor@emil.com',
            password: '1234456'
        })).rejects.toBeInstanceOf(InvalidCredentialsErrors)
    })
})  
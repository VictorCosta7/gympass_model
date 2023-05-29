import { beforeEach, describe, expect, it } from "vitest"
import { inMemoryUserRepository } from "../repositories/im-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { InvalidCredentialsErrors } from "./errors/invalid-credentials-errors"
import { GetUserProfileUseCase } from "./get-user-profile"

let usersRepository: inMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new inMemoryUserRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('shold be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'Victor Rodrigo',
            email: 'victor@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('Victor Rodrigo')
        expect(user.id).toEqual(expect.any(String))
    })

    it('shold not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            userId: 'nono-existing-id'
        })).rejects.toBeInstanceOf(InvalidCredentialsErrors)
    })
})  
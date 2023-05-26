import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUserRepository } from '../repositories/im-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

describe('register Use case', () => {
    it('shold be able to register', async () => {
        const usersRepository = new inMemoryUserRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Victor Costa',
            email: 'victor@email.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('shold hash user password upon registration', async () => {
        const usersRepository = new inMemoryUserRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Victor Costa',
            email: 'victor@email.com',
            password: '123456',
        })

        const isPasswordCorretlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorretlyHashed).toBe(true)
    })

    it('shold not be able to register with same email twice', async () => {
        const usersRepository = new inMemoryUserRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'victor@email.com'

        await registerUseCase.execute({
            name: 'Victor Costa',
            email,
            password: '123456',
        })

        await expect(async () => registerUseCase.execute({
            name: 'Victor Costa',
            email,
            password: '123456',
        })

        ).rejects.toBeInstanceOf(UserAlredyExistsError)
    })
})
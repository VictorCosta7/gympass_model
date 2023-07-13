import 'dotenv/config';
import { execSync } from 'node:child_process'
import { randomUUID } from "crypto";
import { Environment } from "vitest";
import { PrismaClient } from '@prisma/client';

//DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gympass_model?schema=public"

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    async setup() {
        const schema = randomUUID()
        const databaseURL = generateDatabaseURL(schema)

        process.env.DATABASE_URL = databaseURL

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
                )
                prisma.$disconnect
            },
        }
    }
}
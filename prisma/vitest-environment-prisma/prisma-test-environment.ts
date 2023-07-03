import { Environment } from "vitest";

export default <Environment>{
    name: 'prisma',
    async setup() {
        console.log('Começo')

        return {
            teardown() {
                console.log('Final')
            },
        }
    }
}
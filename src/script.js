import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'Prisma replaces traditional ORMs',
            url: 'https://www.prisma.io',
        },
    })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

main()
    .catch((e) => {
        console.error(e)
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
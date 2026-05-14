import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'rizwan@example.com' },
        update: {},
        create: {
            name: 'Rizwan Mushtaq',
            email: 'rizwan@example.com',
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'harun@gmail.com' },
        update: {},
        create: {
            name: 'Harun Mushtaq',
            email: 'harun@gmail.com',
        },
    });
    console.log({ user1, user2 });
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

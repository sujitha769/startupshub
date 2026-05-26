import { prisma } from './src/db'

async function main() {
  const result = await prisma.user.updateMany({
    data: { role: 'ADMIN' },
  })
  console.log(`Upgraded ${result.count} users to ADMIN.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

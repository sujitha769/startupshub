import { prisma } from './src/db'

async function main() {
  await prisma.lead.deleteMany()
  console.log('Deleted all leads')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

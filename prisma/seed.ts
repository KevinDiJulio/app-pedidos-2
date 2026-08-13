import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const pedidos = [
  { productoId: 1, cantidad: 2, estado: "entregado" },
  { productoId: 3, cantidad: 1, estado: "enviado" },
  { productoId: 2, cantidad: 1, estado: "pendiente" },
  { productoId: 7, cantidad: 3, estado: "entregado" },
  { productoId: 4, cantidad: 1, estado: "pendiente" },
  { productoId: 6, cantidad: 2, estado: "enviado" },
];

async function main() {
  console.log("Eliminando pedidos existentes...");
  await prisma.pedido.deleteMany();

  console.log("Insertando pedidos...");
  for (const p of pedidos) {
    await prisma.pedido.create({ data: p });
  }

  console.log(`✓ ${pedidos.length} pedidos insertados`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

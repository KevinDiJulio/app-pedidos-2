"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

export async function cancelarPedido(id: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  await prisma.$transaction(async (tx) => {
    const pedido = await tx.pedido.findUnique({ where: { id } });
    if (!pedido) throw new Error("Pedido no encontrado");
    if (pedido.userId !== userId) throw new Error("No autorizado");

    await tx.producto.update({
      where: { id: pedido.productoId },
      data: { stock: { increment: pedido.cantidad } },
    });
    await tx.pedido.delete({ where: { id } });
  });

  revalidatePath("/pedidos");
  revalidatePath("/");
}

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function crearPedido(productoId: number, cantidad: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  await prisma.$transaction(async (tx) => {
    const producto = await tx.producto.findUnique({ where: { id: productoId } });
    if (!producto) throw new Error("Producto no encontrado");
    if (producto.stock < cantidad) throw new Error("Stock insuficiente");

    await tx.producto.update({
      where: { id: productoId },
      data: { stock: producto.stock - cantidad },
    });
    await tx.pedido.create({ data: { userId, productoId, cantidad } });
  });

  revalidatePath("/");
  revalidatePath("/pedidos");
}

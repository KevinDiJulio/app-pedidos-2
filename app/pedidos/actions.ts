"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

export async function cambiarEstado(id: number, estado: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  await prisma.pedido.update({
    where: { id, userId },
    data: { estado },
  });
  revalidatePath("/pedidos");
}

export async function cancelarPedido(id: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  const pedido = await prisma.pedido.findUnique({ where: { id, userId } });
  if (!pedido) return;

  const productoRes = await fetch(
    `${process.env.TIENDA_API_URL}/api/productos/${pedido.productoId}`,
    { headers: { "x-api-key": process.env.TIENDA_API_KEY! } }
  );

  if (productoRes.ok) {
    const producto = await productoRes.json();
    await fetch(
      `${process.env.TIENDA_API_URL}/api/productos/${pedido.productoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.TIENDA_API_KEY!,
        },
        body: JSON.stringify({ stock: producto.stock + pedido.cantidad }),
      }
    );
  }

  await prisma.pedido.delete({ where: { id } });
  revalidatePath("/pedidos");
  revalidatePath("/");
}

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

export async function cambiarEstado(id: number, estado: string) {
  await prisma.pedido.update({
    where: { id },
    data: { estado },
  });
  revalidatePath("/pedidos");
}

export async function cancelarPedido(id: number) {
  const pedido = await prisma.pedido.findUnique({ where: { id } });
  if (!pedido) return;

  // Devolver stock a app-tienda
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

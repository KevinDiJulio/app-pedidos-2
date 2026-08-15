"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function crearPedido(productoId: number, cantidad: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  const productoRes = await fetch(
    `${process.env.TIENDA_API_URL}/api/productos/${productoId}`,
    { headers: { "x-api-key": process.env.TIENDA_API_KEY! } }
  );

  if (!productoRes.ok) throw new Error("Producto no encontrado");

  const producto = await productoRes.json();

  if (producto.stock < cantidad) throw new Error("Stock insuficiente");

  await fetch(
    `${process.env.TIENDA_API_URL}/api/productos/${productoId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.TIENDA_API_KEY!,
      },
      body: JSON.stringify({ stock: producto.stock - cantidad }),
    }
  );

  await prisma.pedido.create({
    data: { userId, productoId, cantidad },
  });

  revalidatePath("/");
  revalidatePath("/pedidos");
}

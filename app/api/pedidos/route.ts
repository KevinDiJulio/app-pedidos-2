import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

function checkApiKey(req: NextRequest): boolean {
  return req.headers.get("x-api-key") === process.env.PEDIDOS_API_KEY;
}

export async function GET(req: NextRequest) {
  if (!checkApiKey(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const pedidos = await prisma.pedido.findMany({
    orderBy: { creadoEn: "desc" },
  });
  return NextResponse.json(pedidos);
}

export async function POST(req: NextRequest) {
  if (!checkApiKey(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const { productoId, cantidad, userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  }

  // Descontar stock en app-tienda
  const productoRes = await fetch(
    `${process.env.TIENDA_API_URL}/api/productos/${productoId}`,
    { headers: { "x-api-key": process.env.TIENDA_API_KEY! } }
  );

  if (!productoRes.ok) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  const producto = await productoRes.json();

  if (producto.stock < cantidad) {
    return NextResponse.json({ error: "Stock insuficiente" }, { status: 400 });
  }

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

  const pedido = await prisma.pedido.create({
    data: { productoId, cantidad, userId },
  });

  return NextResponse.json(pedido, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type Params = { params: Promise<{ id: string }> };

function unauthorized() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}

function checkApiKey(req: NextRequest): boolean {
  return req.headers.get("x-api-key") === process.env.PEDIDOS_API_KEY;
}

export async function GET(req: NextRequest, { params }: Params) {
  if (!checkApiKey(req)) return unauthorized();

  const { id } = await params;
  const pedido = await prisma.pedido.findUnique({ where: { id: Number(id) } });

  if (!pedido) {
    return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
  }

  return NextResponse.json(pedido);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!checkApiKey(req)) return unauthorized();

  const { id } = await params;
  const body = await req.json();

  const pedido = await prisma.pedido.update({
    where: { id: Number(id) },
    data: { estado: body.estado },
  });

  return NextResponse.json(pedido);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!checkApiKey(req)) return unauthorized();
  const { id } = await params;

  const pedido = await prisma.pedido.findUnique({ where: { id: Number(id) } });

  if (!pedido) {
    return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
  }

  // Devolver el stock a app-tienda
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

  await prisma.pedido.delete({ where: { id: Number(id) } });

  return new NextResponse(null, { status: 204 });
}

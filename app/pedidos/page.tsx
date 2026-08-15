import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../lib/prisma";
import FilaPedido from "./FilaPedido";

export default async function PedidosPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const pedidos = await prisma.pedido.findMany({
    where: { userId },
    include: { producto: true },
    orderBy: { creadoEn: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Mis pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-gray-500">No tenés pedidos todavía.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {["#", "Producto", "Cantidad", "Estado", "Fecha", "Acciones"].map((col) => (
                <th key={col} className="text-left px-3.5 py-2.5 border-b border-gray-200 font-semibold bg-gray-50">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <FilaPedido key={pedido.id} pedido={pedido} />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

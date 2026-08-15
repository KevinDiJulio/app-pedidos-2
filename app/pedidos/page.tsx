import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../lib/prisma";
import FilaPedido from "./FilaPedido";

export default async function PedidosPage() {
  const { userId } = await auth();

  const pedidos = await prisma.pedido.findMany({
    where: { userId: userId! },
    orderBy: { creadoEn: "desc" },
  });

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 24 }}>Mis pedidos</h1>

      {pedidos.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No tenés pedidos todavía.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr>
              {["#", "Producto ID", "Cantidad", "Estado", "Fecha", "Acciones"].map((col) => (
                <th key={col} style={{ textAlign: "left", padding: "10px 14px", borderBottom: "1px solid #e5e7eb", fontWeight: 600, background: "#f9fafb" }}>
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

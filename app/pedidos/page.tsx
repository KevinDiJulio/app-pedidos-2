import { prisma } from "../../lib/prisma";
import FilaPedido from "./FilaPedido";
import styles from "./page.module.css";

export default async function PedidosPage() {
  const pedidos = await prisma.pedido.findMany({
    orderBy: { creadoEn: "desc" },
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className={styles.vacio}>No hay pedidos todavía.</p>
      ) : (
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>#</th>
              <th>Producto ID</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
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

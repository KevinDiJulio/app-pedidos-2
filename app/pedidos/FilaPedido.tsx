"use client";

import { cancelarPedido } from "./actions";
import styles from "./FilaPedido.module.css";

type Pedido = {
  id: number;
  producto: { nombre: string; emoji: string };
  cantidad: number;
  estado: string;
  creadoEn: Date;
};

export default function FilaPedido({ pedido }: { pedido: Pedido }) {
  return (
    <tr>
      <td>{pedido.id}</td>
      <td>{pedido.producto.emoji} {pedido.producto.nombre}</td>
      <td>{pedido.cantidad}</td>
      <td>
        <span className={`${styles.estado} ${styles[pedido.estado]}`}>
          {pedido.estado}
        </span>
      </td>
      <td>{new Date(pedido.creadoEn).toLocaleDateString("es-AR")}</td>
      <td>
        {pedido.estado === "pendiente" && (
          <button
            onClick={() => cancelarPedido(pedido.id)}
            className={styles.botonCancelar}
          >
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
}

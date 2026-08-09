"use client";

import { useState } from "react";
import { cambiarEstado, cancelarPedido } from "./actions";
import styles from "./FilaPedido.module.css";

type Pedido = {
  id: number;
  productoId: number;
  cantidad: number;
  estado: string;
  creadoEn: Date;
};

type Props = { pedido: Pedido };

const ESTADOS = ["pendiente", "enviado", "entregado"];

export default function FilaPedido({ pedido }: Props) {
  const [estado, setEstado] = useState(pedido.estado);

  async function handleCambiarEstado(nuevoEstado: string) {
    setEstado(nuevoEstado);
    await cambiarEstado(pedido.id, nuevoEstado);
  }

  return (
    <tr>
      <td>{pedido.id}</td>
      <td>{pedido.productoId}</td>
      <td>{pedido.cantidad}</td>
      <td>
        <select
          value={estado}
          onChange={(e) => handleCambiarEstado(e.target.value)}
          className={styles.select}
        >
          {ESTADOS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </td>
      <td>{new Date(pedido.creadoEn).toLocaleDateString("es-AR")}</td>
      <td>
        <button
          onClick={() => cancelarPedido(pedido.id)}
          className={styles.botonCancelar}
        >
          Cancelar
        </button>
      </td>
    </tr>
  );
}

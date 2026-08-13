"use client";

import { useState } from "react";
import { cambiarEstado, cancelarPedido } from "./actions";

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
      <td className="px-3.5 py-2.5 border-b border-gray-200">{pedido.id}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{pedido.productoId}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{pedido.cantidad}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">
        <select
          value={estado}
          onChange={(e) => handleCambiarEstado(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm cursor-pointer"
        >
          {ESTADOS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">
        {new Date(pedido.creadoEn).toLocaleDateString("es-AR")}
      </td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">
        <button
          onClick={() => cancelarPedido(pedido.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md text-xs font-semibold cursor-pointer hover:bg-red-600"
        >
          Cancelar
        </button>
      </td>
    </tr>
  );
}

"use client";

import { cancelarPedido } from "./actions";

type Pedido = {
  id: number;
  producto: { nombre: string; emoji: string };
  cantidad: number;
  estado: string;
  creadoEn: Date;
};

type Props = { pedido: Pedido };

export default function FilaPedido({ pedido }: Props) {
  return (
    <tr>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{pedido.id}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">
        {pedido.producto.emoji} {pedido.producto.nombre}
      </td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{pedido.cantidad}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">{pedido.estado}</td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">
        {new Date(pedido.creadoEn).toLocaleDateString("es-AR")}
      </td>
      <td className="px-3.5 py-2.5 border-b border-gray-200">
        {pedido.estado !== "cancelado" && (
          <button
            onClick={() => cancelarPedido(pedido.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md text-xs font-semibold cursor-pointer hover:bg-red-600"
          >
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
}

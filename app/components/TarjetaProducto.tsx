"use client";

import { useState } from "react";
import { Producto } from "../types";
import { crearPedido } from "../actions";

type Props = { producto: Producto };

export default function TarjetaProducto({ producto }: Props) {
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(false);

  async function hacerPedido() {
    setCargando(true);
    try {
      await crearPedido(producto.id, cantidad);
      setCantidad(1);
    } finally {
      setCargando(false);
    }
  }

  const sinStock = producto.stock === 0;

  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-2">
      <div className="text-4xl">{producto.emoji}</div>
      <h2 className="text-lg font-bold">{producto.nombre}</h2>
      <p className="text-sm text-gray-500 flex-1">{producto.descripcion}</p>
      <p className="text-xs text-gray-400">Stock disponible: {producto.stock}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold">${producto.precio.toLocaleString("es-AR")}</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={producto.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
            className="w-14 px-2 py-1.5 border border-gray-300 rounded-md text-sm text-center"
            disabled={sinStock}
          />
          <button
            onClick={hacerPedido}
            disabled={sinStock || cargando}
            className={sinStock
              ? "px-3.5 py-1.5 bg-gray-200 text-gray-400 rounded-md text-sm font-semibold cursor-not-allowed"
              : "px-3.5 py-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700"}
          >
            {sinStock ? "Sin stock" : cargando ? "..." : "Hacer pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}

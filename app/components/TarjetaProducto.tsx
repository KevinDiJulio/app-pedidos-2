"use client";

import { useState } from "react";
import { Producto } from "../types";
import { crearPedido } from "../actions";
import styles from "./TarjetaProducto.module.css";

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
    <div className={styles.tarjeta}>
      <div className={styles.emoji}>{producto.emoji}</div>
      <h2 className={styles.nombre}>{producto.nombre}</h2>
      <p className={styles.descripcion}>{producto.descripcion}</p>
      <p className={styles.stock}>Stock disponible: {producto.stock}</p>
      <div className={styles.pie}>
        <span className={styles.precio}>${producto.precio.toLocaleString("es-AR")}</span>
        <div className={styles.pedido}>
          <input
            type="number"
            min={1}
            max={producto.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
            className={styles.cantidad}
            disabled={sinStock}
          />
          <button
            onClick={hacerPedido}
            disabled={sinStock || cargando}
            className={sinStock ? styles.botonAgotado : styles.boton}
          >
            {sinStock ? "Sin stock" : cargando ? "..." : "Hacer pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}

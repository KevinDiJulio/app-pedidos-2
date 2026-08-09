import TarjetaProducto from "./components/TarjetaProducto";
import { Producto } from "./types";
import styles from "./page.module.css";

async function obtenerProductos(): Promise<Producto[]> {
  const res = await fetch(`${process.env.TIENDA_API_URL}/api/productos`, {
    headers: { "x-api-key": process.env.TIENDA_API_KEY! },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("No se pudo obtener el catálogo");

  return res.json();
}

export default async function Home() {
  const productos = await obtenerProductos();

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Catálogo de productos</h1>
      <div className={styles.grilla}>
        {productos.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}

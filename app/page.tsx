import { prisma } from "../lib/prisma";
import TarjetaProducto from "./components/TarjetaProducto";
import styles from "./page.module.css";

export default async function Home() {
  const productos = await prisma.producto.findMany();

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

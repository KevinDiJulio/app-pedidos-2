import { prisma } from "../lib/prisma";
import TarjetaProducto from "./components/TarjetaProducto";

export default async function Home() {
  const productos = await prisma.producto.findMany();

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Catálogo de productos</h1>
      <div className="grid grid-cols-2 gap-6">
        {productos.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}

import TarjetaProducto from "./components/TarjetaProducto";
import { Producto } from "./types";

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

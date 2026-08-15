-- Limpiar datos existentes sin userId y agregar columna
DELETE FROM "Pedido";
ALTER TABLE "Pedido" ADD COLUMN "userId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Pedido" ALTER COLUMN "userId" DROP DEFAULT;

import type { Metadata } from "next";
import { ClerkProvider, UserButton, SignInButton, Show } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "App de pedidos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <nav style={{ padding: "12px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "20px" }}>
            <a href="/">Catálogo</a>
            <Show when="signed-in">
              <a href="/pedidos">Mis pedidos</a>
            </Show>
            <div style={{ marginLeft: "auto" }}>
              <Show when="signed-in">
                <UserButton />
              </Show>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button style={{ padding: "6px 16px", background: "#111", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.875rem" }}>
                    Iniciar sesión
                  </button>
                </SignInButton>
              </Show>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

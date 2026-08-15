import type { Metadata } from "next";
import { ClerkProvider, UserButton, SignInButton, Show } from "@clerk/nextjs";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "App de pedidos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <nav className={styles.nav}>
            <a href="/">Catálogo</a>
            <Show when="signed-in">
              <a href="/pedidos">Mis pedidos</a>
            </Show>
            <div className={styles.navEnd}>
              <Show when="signed-in">
                <UserButton />
              </Show>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className={styles.btnSignIn}>Iniciar sesión</button>
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

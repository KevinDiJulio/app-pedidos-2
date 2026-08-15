import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
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
          <nav className="flex items-center gap-5 px-6 py-3 border-b border-gray-200">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">Catálogo</a>
            <SignedIn>
              <a href="/pedidos" className="text-sm font-medium text-gray-700 hover:text-gray-900">Mis pedidos</a>
            </SignedIn>
            <div className="ml-auto">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700">
                    Iniciar sesión
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

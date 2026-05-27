// in: app/layout.tsx
// ÎNLOCUIEȘTE complet fișierul existent
// Singura schimbare: am scos importul CartProvider din 'use-shopping-cart'
// și am păstrat totul la fel

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartProvider from "@/providers/Cart"; // ← Același import, fișier înlocuit
import { Toaster } from "react-hot-toast";
import FloatingCartButton from "@/components/FloatingCartButton";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelForge 3D - Portofoliu si Magazin",
  description: "Modele 3D inovatoare si produse unice printate 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <CartProvider>
          <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1f2937",
                  color: "#fff",
                  border: "1px solid #374151",
                },
              }}
            />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingCartButton />
            <CartSidebar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

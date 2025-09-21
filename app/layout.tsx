import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// PASUL 1: Importă componentele Header și Footer
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Importă noul provider
import CartProvider from "@/providers/Cart"; 
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelForge 3D - Portofoliu si Magazin",
  description: "Modele 3D inovatoare si produse unice printate la imprimanta 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        {/* Folosim un div principal pentru a aplica fundalul,
            așa încât să nu afecteze alte elemente. */}
            <Toaster />
            <CartProvider>
              <div className="bg-gray-900 text-white min-h-screen flex flex-col">

                {/* PASUL 2: Plasează Header-ul aici */}
                <Header />
                
                {/* 'main' este locul unde va fi randat conținutul paginii (children) */}
                <main className="flex-grow">
                  {children}
                </main>

                {/* PASUL 3: Plasează Footer-ul aici */}
                <Footer />

              </div>
        </CartProvider>
      </body>
    </html>
  );
}
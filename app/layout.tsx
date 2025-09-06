import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Importă noua componentă
import NetlifyForm from "@/components/NetlifyForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remus3D - Portofoliu si Magazin",
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
        {/* 2. Adaugă formularul ascuns aici. 
            Nu va fi vizibil pe site, dar va fi în codul sursă. */}
        <NetlifyForm />
        
        {/* Aici vine restul site-ului tău */}
        {children}
      </body>
    </html>
  );
}
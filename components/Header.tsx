"use client"; // <--- ADAUGAȚI ACEASTĂ LINIE LA ÎNCEPUTUL FIȘIERULUI
import Link from 'next/link'; // Importăm Link
import Image from 'next/image';
import { useState } from "react";

export default function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-0 flex justify-between items-center">
        
        <Link href="/" className="flex items-center">
          <Image
            src="/images/dreamlogo.png" // Sau ce logo folosești tu
            alt="Remus3D Logo" 
            width={180} 
            height={45} 
            className="h-auto"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-white pr-10">
          {/* Link către secțiunea de pe pagina principală */}
          <Link href="/#portfolio" className="hover:text-cyan-400 transition-colors">Portofoliu</Link>
          {/* Link către noua pagină de magazin */}
          <Link href="/#shop" className="hover:text-cyan-400 transition-colors">Magazin</Link>
          <Link href="/#about" className="hover:text-cyan-400 transition-colors">Despre</Link>
          <Link href="/#contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
        </div>
        
        {/* <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button> */}
        {/* Buton Hamburger - vizibil doar pe mobil */}
                    <button className="md:hidden p-1 text-white" onClick={() => setMobileNavActive(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
      </nav>
       {/* Meniul Dropdown pentru mobil */}
            <div className={`transition-all duration-300 ${mobileNavActive ? 'block' : 'hidden'} md:hidden`}>
                <div className="fixed top-0 left-0 w-full h-full bg-[#222] bg-opacity-95 backdrop-blur-sm p-5 z-25">
                    <div className="flex justify-end mb-4">
                        {/* Buton de inchidere (X) */}
                        <button className="p-1 text-white" onClick={() => setMobileNavActive(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-6 items-center bg-[#222] bg-opacity-95 text-[#aaa] text-xl mt-8 pb-5">
                        <Link href='/'onClick={() => setMobileNavActive(false)}>Acasa</Link>
                        <Link href="/portofoliu" onClick={() => setMobileNavActive(false)}>Portofoliu</Link>
                        <Link href="/magazin" onClick={() => setMobileNavActive(false)}>Magazin</Link>
                        <Link href='/about' onClick={() => setMobileNavActive(false)}>Despre</Link>
                        <Link href='/contact' onClick={() => setMobileNavActive(false)}>Contact</Link>
                    </nav>
                </div>
            </div>
    </header>
  );
}
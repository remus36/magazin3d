import { Package, Scan, Home, User, Mail } from 'lucide-react';
import Image from 'next/image';


export default function Header() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 "  >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-cyan-400">
            <Image
            src="/images/logo.png" // Calea către logo-ul din folderul /public
            alt="Creative 3D Logo" // Text alternativ pentru accesibilitate
            width={100} // Lățimea logo-ului în pixeli. Modifică după nevoie!
            height={45} // Înălțimea logo-ului în pixeli. Modifică după nevoie!
            className="h-auto" // Asigură menținerea proporțiilor
          />
          </a>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#portfolio" className=" text-cyan-400 hover:text-white transition-colors">Portofoliu</a>
          <a href="#shop" className="text-cyan-400 hover:text-white transition-colors">Magazin</a>
          <a href="#about" className="text-cyan-400 hover:text-white transition-colors">Despre</a>
          <a href="#contact" className="text-cyan-400 hover:text-white transition-colors">Contact</a>
        </div>
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
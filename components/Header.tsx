import Link from 'next/link'; // Importăm Link
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-0 flex justify-between items-center">
        
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png" // Sau ce logo folosești tu
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
        
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
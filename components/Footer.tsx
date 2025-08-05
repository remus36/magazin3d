import Image from 'next/image';
// Importă iconițe pentru social media
import { Linkedin, Instagram, Facebook } from 'lucide-react'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700 text-gray-400">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              {/* Folosim același logo ca în Header */}
              <Image
                src="/images/logo.png"
                alt="Logo Footer"
                width={150}
                height={38}
                className="h-auto"
              />
            </a>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#portfolio" className="hover:text-white transition-colors">Portofoliu</a>
            <a href="#shop" className="hover:text-white transition-colors">Magazin</a>
            <a href="#about" className="hover:text-white transition-colors">Despre</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex space-x-4">
            {/* Înlocuiește '#' cu linkurile tale reale */}
            <a href="#" aria-label="LinkedIn" className="hover:text-cyan-400 transition-colors"><Linkedin size={24} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-cyan-400 transition-colors"><Instagram size={24} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-cyan-400 transition-colors"><Facebook size={24} /></a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm">
          <p>© {currentYear} Creative 3D. Toate drepturile rezervate.</p>
           {/* Aici poți adăuga linkuri către paginile de Termeni și Confidențialitate */}
          <p className="mt-2">
            <a href="#" className="hover:text-white">Termeni și Condiții</a> ・ <a href="#" className="hover:text-white">Politică de Confidențialitate</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
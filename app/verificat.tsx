"use client"; // <--- ADAUGAȚI ACEASTĂ LINIE LA ÎNCEPUTUL FIȘIERULUI

import Link from "next/link";
import { useState } from "react";

export default function Header() {

    const [mobileNavActive, setMobileNavActive] = useState(false);

    return (
        <header className="bg-[#222] relative">
            {/* Div-ul acesta inlocuieste componenta <Center> */}
            <div className="max-w-[800px] mx-auto px-[20px]">
                <div className="flex justify-between p-[20px] items-center">
                    <Link href={'/'} className="text-white no-underline">Magazin3D</Link>
                    
                    {/* Navigatie pentru Desktop - ascunsa pe mobil */}
                    <nav className="hidden md:flex gap-[15px] items-center text-[#aaa]">
                        <Link href={'/'}>Acasa</Link>
                        <Link href={'/products'}>Toate Produsele</Link>
                        <Link href={'/categories'}>Categorii</Link>
                        <Link href={'/account'}>Cont</Link>
                        <Link href={'/cart'}>Cos</Link>
                    </nav>

                    {/* Buton Hamburger - vizibil doar pe mobil */}
                    <button className="md:hidden p-1 text-white" onClick={() => setMobileNavActive(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Meniul Dropdown pentru mobil */}
            <div className={`transition-all duration-300 ${mobileNavActive ? 'block' : 'hidden'} md:hidden`}>
                <div className="fixed top-0 left-0 w-full h-full bg-[#222] bg-opacity-95 p-5 z-20">
                    <div className="flex justify-end mb-4">
                        {/* Buton de inchidere (X) */}
                        <button className="p-1 text-white" onClick={() => setMobileNavActive(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-6 items-center text-[#aaa] text-xl mt-8">
                        <Link href={'/'} onClick={() => setMobileNavActive(false)}>Acasa</Link>
                        <Link href={'/products'} onClick={() => setMobileNavActive(false)}>Toate Produsele</Link>
                        <Link href={'/categories'} onClick={() => setMobileNavActive(false)}>Categorii</Link>
                        <Link href={'/account'} onClick={() => setMobileNavActive(false)}>Cont</Link>
                        <Link href={'/cart'} onClick={() => setMobileNavActive(false)}>Cos</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
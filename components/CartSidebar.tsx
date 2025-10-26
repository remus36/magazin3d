// in: components/CartSidebar.tsx

"use client";

import { useShoppingCart } from "use-shopping-cart";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CartSidebar() {
  // Extragem funcțiile necesare. 'redirectToCheckout' NU mai este necesar.
  const { 
    cartCount, 
    shouldDisplayCart, 
    handleCartClick, 
    cartDetails, 
    removeItem, 
    incrementItem, 
    decrementItem,
    totalPrice,
  } = useShoppingCart();

  // Stare pentru a gestiona feedback-ul vizual la click pe butonul de checkout
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  /**
   * Gestionează procesul de checkout.
   * Trimite detaliile coșului la un API route pentru a crea o sesiune Stripe
   * și apoi redirecționează utilizatorul la pagina de plată.
   */
  async function handleCheckoutClick() {
    if (cartCount !== undefined && cartCount > 0) {
      setIsCheckingOut(true); // Afișăm starea de încărcare
      try {
        // Trimitem o cerere POST la endpoint-ul nostru API securizat
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartDetails), // Coșul este trimis în corpul cererii
        });

        const session = await response.json();

        // Verificăm dacă cererea a fost un succes
        if (response.ok) {
          // Extragem URL-ul de plată din răspunsul serverului
          if (session.url) {
            // Facem redirecționarea manual, folosind API-ul standard al browser-ului
            window.location.href = session.url;
          } else {
            throw new Error("Răspunsul de la server nu conține un URL de checkout.");
          }
        } else {
          // Dacă serverul a returnat o eroare, o aruncăm pentru a fi prinsă de 'catch'
          throw new Error(session.error || "A apărut o eroare la server.");
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Eroare necunoscută';
        console.error("Eroare la checkout:", errorMessage);
        // Poți adăuga o notificare "toast" de eroare aici
        // alert(`Eroare: ${errorMessage}`);
        setIsCheckingOut(false); // Oprim starea de încărcare DOAR în caz de eroare
      }
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        shouldDisplayCart ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={!shouldDisplayCart ? undefined : () => handleCartClick()}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-lg flex flex-col transform transition-transform duration-300 ${
          shouldDisplayCart ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header-ul panoului */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Coșul tău ({cartCount ?? 0})</h2>
          <button onClick={() => handleCartClick()} className="p-1 rounded-full hover:bg-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Corpul panoului (lista de produse) */}
        <div className="flex-1 overflow-y-auto">
          {cartCount !== undefined && cartCount > 0 ? (
            <div className="p-4">
              {Object.values(cartDetails ?? {}).map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-800">
                    <Image src={item.image!} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.formattedValue}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => decrementItem(item.id)} className="p-1 rounded-full hover:bg-gray-700"><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => incrementItem(item.id)} className="p-1 rounded-full hover:bg-gray-700"><Plus size={16} /></button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <p>Coșul tău este gol.</p>
            </div>
          )}
        </div>

        {/* Footer-ul panoului */}
        {(cartCount !== undefined && cartCount > 0) && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-cyan-400">{totalPrice?.toFixed(2)} RON</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              disabled={isCheckingOut}
              className="w-full bg-cyan-500 text-white font-bold py-3 rounded-md hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
              {isCheckingOut ? 'Se procesează...' : 'Finalizează Comanda'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
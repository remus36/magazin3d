// in: app/contact/page.tsx
"use client";

import {  useFormStatus } from 'react-dom';
import { sendContactEmail, FormState } from './actions'; // Importăm funcția și tipul
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

// O componentă separată pentru buton, pentru a putea folosi 'useFormStatus'
function SubmitButton() {
  const { pending } = useFormStatus(); // 'pending' este true în timpul trimiterii

  return (
    <button 
      type="submit"
      disabled={pending}
      className="bg-cyan-500 text-white font-bold py-3 px-10 rounded-md hover:bg-cyan-600 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-wait"
    >
      {pending ? 'Se trimite...' : 'Trimite Mesajul'}
    </button>
  );
}

export default function ContactPage() {
  const initialState: FormState = null;
  // Hook-ul 'useFormState' gestionează starea formularului
  const [formState, formAction] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Efect pentru a afișa notificări și a reseta formularul
  useEffect(() => {
    if (formState?.message) {
      if (formState.issues) { // Dacă sunt erori de validare
        toast.error(formState.message + "\n" + (formState.issues.join("\n") || ''));
      } else { // Dacă este un mesaj de succes sau o eroare generală
        toast.success(formState.message);
        if (formState.message.includes("succes")) {
          formRef.current?.reset(); // Resetează formularul la succes
        }
      }
    }
  }, [formState]);

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-center mb-4">Contactează-mă</h1>
      <p className="text-xl text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Ai o întrebare sau vrei să începi un proiect nou? Completează formularul de mai jos și îți voi răspunde în cel mai scurt timp.
      </p>

      {/* Formularul apelează acum 'formAction' */}
      <form 
        ref={formRef}
        action={formAction}
        className="max-w-xl mx-auto"
      >
        {/* Câmpul pentru Nume */}
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Numele tău</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="ex: Andrei Popescu"
          />
        </div>

        {/* Câmpul pentru Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Adresa de email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="ex: andrei.popescu@email.com"
          />
        </div>

        {/* Câmpul pentru Mesaj */}
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Mesajul tău</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="Descrie aici proiectul tău sau întrebarea pe care o ai..."
          ></textarea>
        </div>

        {/* Butonul de Trimitere este acum o componentă separată */}
        <div className="text-center">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
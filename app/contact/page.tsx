'use client'; // Păstrăm 'use client' pentru interactivitate

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Schema de validare Zod rămâne la fel
const formSchema = z.object({
  name: z.string().min(2, { message: "Numele trebuie să aibă cel puțin 2 caractere." }),
  email: z.string().email({ message: "Adresa de email este invalidă." }),
  message: z.string().min(10, { message: "Mesajul trebuie să aibă cel puțin 10 caractere." })
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  // NU mai avem nevoie de funcția 'onSubmit' cu fetch. O vom defini direct în formular.

  return (
    <>
      <Header />
      <main className="bg-gray-900 py-20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Contactează-mă</h1>
          <p className="text-gray-400 mb-12">
            Ai un proiect în minte sau vrei o ofertă personalizată? Completează formularul de mai jos și îți voi răspunde în cel mai scurt timp.
          </p>

          {isSubmitSuccessful ? (
            <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Mulțumesc! </strong>
              <span className="block sm:inline">Mesajul tău a fost trimis cu succes.</span>
            </div>
          ) : (
            // === MODIFICAREA CHEIE ESTE AICI ===
            <form 
              name="contact" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              // Folosim 'action' pentru a trimite la o pagină de succes, dar React Hook Form va prelua controlul
              action="/?success=true"
              onSubmit={handleSubmit(async (data) => {
                  // Aceasta este noua logică de trimitere
                  const formData = new FormData();
                  formData.append('form-name', 'contact');
                  Object.entries(data).forEach(([key, value]) => {
                    formData.append(key, value);
                  });

                  await fetch('/', {
                      method: 'POST',
                      body: formData
                  });
                  reset();
              })}
              className="text-left"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
                </label>
              </p>

              {/* Restul câmpurilor (input, textarea) rămân exact la fel */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Nume</label>
                <input 
                  type="text" 
                  id="name"
                  {...register("name")}
                  className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input 
                  type="email" 
                  id="email"
                  {...register("email")}
                  className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Mesaj</label>
                <textarea 
                  id="message" 
                  rows={6}
                  {...register("message")}
                  className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" 
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-600"
              >
                {isSubmitting ? "Se trimite..." : "Trimite Mesajul"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

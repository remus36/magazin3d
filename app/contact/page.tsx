'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// 1. Importăm Server Action
import { submitContactForm } from './actions';

// Schema Zod rămâne la fel...
const formSchema = z.object({ /* ... */ });
type FormSchemaType = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // 2. Noua funcție onSubmit care apelează Server Action
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setFormError(''); // Resetăm eroarea
    const result = await submitContactForm(data);

    if (result.success) {
      setFormSuccess(true);
      reset();
    } else {
      setFormError(result.error || "A apărut o eroare necunoscută.");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-gray-900 py-20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          {/* ... titlul și paragraful ... */}

          {formSuccess ? (
            <div className="bg-green-900 ...">
              Mesajul a fost trimis cu succes.
            </div>
          ) : (
            // 3. Formularul curat, fără atribute Netlify
            <form onSubmit={handleSubmit(onSubmit)} className="text-left">
              {/* Restul câmpurilor (input, textarea) rămân la fel */}
              {/* ... */}
              
              {formError && <p className="text-red-500 text-center mt-4">{formError}</p>}
              
              <button type="submit" disabled={isSubmitting}>
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
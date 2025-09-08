'use server'; // Această directivă marchează fișierul ca având Server Actions

import { z } from 'zod';

// Refolosim schema Zod pentru a valida datele și pe server
const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string()
});

// Aceasta este funcția care va rula pe server
export async function submitContactForm(data: unknown) {
  // Validăm datele pe server pentru siguranță
  const result = formSchema.safeParse(data);

  if (!result.success) {
    // Dacă datele nu sunt valide, returnăm o eroare
    return { success: false, error: "Date invalide." };
  }

  // Pregătim datele pentru a fi trimise la Netlify
  const formData = new URLSearchParams();
  formData.append('form-name', 'contact'); // Netlify are nevoie de acest câmp
  formData.append('name', result.data.name);
  formData.append('email', result.data.email);
  formData.append('message', result.data.message);
  
  try {
    // Trimiterea datelor către endpoint-ul special Netlify
    // Acest URL este fix și nu trebuie schimbat.
    await fetch(process.env.URL || 'http://localhost:3000', { // URL-ul site-ului
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: formData.toString(),
});

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Eroare la trimiterea formularului." };
  }
}
import React from 'react';
import { Metadata } from 'next';

// Metadata pentru a ne asigura că pagina nu este indexată de Google
export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Netlify Form Submit Page'
};

// Componenta simplă
export default function NetlifyFormDetectionPage() {
  return (
    <div className="hidden">
      <form 
        name="contact" 
        data-netlify="true" 
        data-netlify-honeypot="bot-field" 
        // Nu este nevoie de action, Netlify preia controlul
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        {/* Câmpurile din formularul real */}
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form>
    </div>
  );
}
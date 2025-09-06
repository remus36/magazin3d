import React from 'react';

export default function NetlifyForm() {
  return (
    <form 
      name="contact" 
      data-netlify="true" 
      data-netlify-honeypot="bot-field" 
      hidden // Ascundem formularul de utilizatori
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>
  );
}
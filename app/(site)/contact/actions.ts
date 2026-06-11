// in: app/contact/actions.ts
"use server";

import { Resend } from 'resend';
import { z } from 'zod';

console.log("--- Server Action 'sendContactEmail' a fost apelată ---");
console.log("Cheia API Resend (primele 5 caractere):", process.env.RESEND_API_KEY?.substring(0, 5));

const resend = new Resend(process.env.RESEND_API_KEY);
    
const contactFormSchema = z.object({
    name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere."),
    email: z.string().email("Te rugăm să introduci o adresă de email validă."),
    message: z.string().min(10, "Mesajul trebuie să conțină cel puțin 10 caractere."),
});

// Tipul pentru starea formularului
export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
} | null;

export async function sendContactEmail(prevState: FormState, formData: FormData): Promise<FormState> {
    
  console.log("Date primite de la formular:", {
        name: formData.get('name'),
        email: formData.get('email'),
    });

  const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
    };

    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
        return {
            message: "Formularul conține erori.",
            issues: result.error.issues.map(issue => issue.message),
        };
    }
    
    try {
      console.log("Încerc să trimit email-ul...");
        await resend.emails.send({
            from: 'onboarding@resend.dev', // Adresa trebuie să fie verificată în Resend
            to: 'dreamprints.creations@gmail.com', // << PUNE ADRESA TA REALĂ AICI
            subject: `Mesaj nou de la ${result.data.name} de pe site`,
            replyTo: result.data.email,
            html: `<p><strong>Nume:</strong> ${result.data.name}</p>
                   <p><strong>Email:</strong> ${result.data.email}</p>
                   <p><strong>Mesaj:</strong></p>
                   <p>${result.data.message.replace(/\n/g, '<br>')}</p>`, // Înlocuim liniile noi cu <br>
        });
        console.log("Email trimis cu succes către API-ul Resend!");
        return { message: "Mesajul tău a fost trimis cu succes! Îți vom răspunde în curând." };
    } catch (error) {
      console.error("!!! A APĂRUT O EROARE LA TRIMITEREA EMAIL-ULUI:", error);
        return { message: 'A apărut o eroare la trimiterea email-ului. Te rugăm să încerci mai târziu.' };
    }
}
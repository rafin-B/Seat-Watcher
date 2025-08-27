
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(to: string, subject: string, text: string) {
  if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
  if (!process.env.EMAIL_FROM) throw new Error("Missing EMAIL_FROM");
  const r = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  });
  if (r.error) {
    throw new Error(String(r.error));
  }
}

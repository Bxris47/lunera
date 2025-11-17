import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const filePath = path.join(process.cwd(), "data", "newsletter.json");

    let entries = [];

    try {
      const content = await fs.readFile(filePath, "utf8");
      entries = JSON.parse(content);
    } catch {}

    entries.push({
      email,
      ip,
      createdAt: new Date().toISOString(),
    });

    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(entries, null, 2));

    // 🚀 Professionelle HTML Email
    await resend.emails.send({
      from: "Lunera Beauty <noreply@resend.dev>",
      to: email,
      subject: "Willkommen bei Lunera Beauty ✨",
      html: `
  <div style="font-family: 'Helvetica', Arial, sans-serif; background-color: #faf9f7; padding: 40px 0; text-align: center;">
    <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 14px; padding: 40px; box-shadow: 0 8px 22px rgba(0,0,0,0.05);">
      
    <img src="https://imgur.com/a/PMnBXkE"
        alt="Lunera Beauty"
        style="width: 120px; margin-bottom: 20px;" />


      <h1 style="font-size: 26px; font-weight: 600; margin: 0; color: #111;">
        Willkommen im Lunera Beauty Newsletter 💛
      </h1>

      <p style="margin: 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
        Schön, dass du da bist!  
        Ab jetzt erhältst du exklusive Angebote, Rabatte und Beauty-Tipps direkt in dein Postfach.
      </p>

      <div style="margin: 30px 0;">
        <a href="https://www.lunera-beauty.de" style="background: #000; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block;">
          Jetzt Angebote entdecken ✨
        </a>
      </div>

      <p style="color: #777; font-size: 14px; line-height: 1.6;">
        Wir freuen uns, dich in unserer Beauty-Community zu haben.<br>
        Liebe Grüße,<br>
        <strong>Lunera Beauty Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

      <p style="color: #aaa; font-size: 12px;">
        Du erhältst diese Email, weil du dich auf unserer Website angemeldet hast.
      </p>

    </div>
  </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.log("Newsletter Error:", err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}

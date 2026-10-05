import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/email";

// MOCK endpoint for the concept homepage. It validates and answers, but stores nothing.
// Real storage would go here: insert into a waitlist table (e.g. Postgres/Supabase) or call
// the email provider's audience API, with rate limiting and a double opt-in email.
export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Send a JSON body like { \"email\": \"you@example.com\" }." }, { status: 400 });
  }

  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  // Let the loading state be seen while developing.
  if (process.env.NODE_ENV === "development") await new Promise((r) => setTimeout(r, 600));

  return NextResponse.json({ ok: true });
}

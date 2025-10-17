import { NextResponse } from "next/server";

export async function GET() {
  // Expose whether a Formspree ID is configured. In development we enable a
  // mock mode so the form can be tested without real Formspree credentials.
  const envId =
    process.env.FORMSPREE_FORM_ID || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  const hasId = Boolean(envId && String(envId).trim().length > 0);
  const configured = hasId || process.env.NODE_ENV !== "production";
  return NextResponse.json({ configured });
}

// ...existing code...
import { NextResponse } from 'next/server';

export async function GET() {
  // Do not expose the actual form ID to the client; only tell whether it's configured on the server.
  const envId = process.env.FORMSPREE_FORM_ID || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  const configured = Boolean(envId && String(envId).trim().length > 0);
  return NextResponse.json({ configured });
}
// ...existing code...


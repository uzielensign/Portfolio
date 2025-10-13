"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@formspree/react";
import ContactFormUI from "./ContactFormUI";
import { useContactForm } from "./useContactForm";

// Read the Formspree form ID from environment; the component will require this to be set.
// We no longer rely solely on a build-time NEXT_PUBLIC var. We'll detect at runtime whether
// a server-side Formspree ID exists (via /api/contact/config) and choose the appropriate rendering path.
const ENV_FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

type ServerConfigResponse = { configured: boolean };

// Top-level wrapper: show a friendly warning when the environment variable is missing.
export default function ContactForm(): React.ReactElement | null {
  // runtime state: 'loading' while we check the server, 'client' when a public NEXT var exists
  // 'server' when only a server-side form id exists, or 'none' when not configured
  const [mode, setMode] = useState<'loading' | 'client' | 'server' | 'none'>(() => {
    // If the public NEXT var exists at build time, prefer client path immediately.
    return ENV_FORMSPREE_FORM_ID ? 'client' : 'loading';
  });

  // Compute normalized form ID once. Even if empty, calling hooks below must be unconditional to satisfy rules-of-hooks.
  const normalizedId = ENV_FORMSPREE_FORM_ID && ENV_FORMSPREE_FORM_ID.startsWith("f/")
    ? ENV_FORMSPREE_FORM_ID.slice(2)
    : (ENV_FORMSPREE_FORM_ID || "");

  // Hooks must be called unconditionally at the top level.
  // `useForm` will receive an empty string when no public ID exists; that's acceptable for preserving hook order.
  const [state] = useForm(normalizedId);
  const {
    formRef,
    clientErrors,
    isProcessing,
    localSucceeded,
    onSubmit,
  } = useContactForm();

  useEffect(() => {
    if (mode === 'client') return; // already decided
    let mounted = true;
    // Ask the server whether a Formspree ID is configured. This endpoint does NOT return the ID,
    // only a boolean indicating presence. That allows us to render a server-backed form without
    // exposing secrets in the client bundle.
    fetch('/api/contact/config')
      .then((res) => res.json())
      .then((data: ServerConfigResponse) => {
        if (!mounted) return;
        setMode(data.configured ? 'server' : 'none');
      })
      .catch(() => {
        if (!mounted) return;
        setMode('none');
      });
    return () => {
      mounted = false;
    };
  }, [mode]);

  if (mode === 'loading') {
    // Avoid layout shift; show nothing until we know which UI to show
    return null;
  }

  if (mode === 'none') {
    return (
      <div className="mx-auto max-w-xl bg-yellow-50 border border-yellow-300 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-2 text-yellow-800">Contact form is not configured</h3>
        <p className="text-sm text-yellow-700">This site is missing the required Formspree configuration. To enable the contact form, set the <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_FORMSPREE_FORM_ID</code> environment variable to your Formspree form ID and restart the app.</p>
        <p className="mt-3 text-sm text-yellow-700">Example (zsh):</p>
        <pre className="mt-2 p-2 rounded bg-yellow-100 text-sm">{'export NEXT_PUBLIC_FORMSPREE_FORM_ID="f/yourFormId"'}</pre>
      </div>
    );
  }

  // For server mode we rely on our hook for submission/validation and for client mode we still
  // leverage Formspree state. Hooks are already invoked above.
  if (mode === 'server') {
    return (
      <ContactFormUI
        formRef={formRef}
        onSubmit={onSubmit}
        isProcessing={isProcessing}
        clientErrors={clientErrors}
        serverErrors={[]}
        succeeded={localSucceeded}
        formspreeErrors={[]}
        submitting={false}
      />
    );
  }

  // client path
  return (
    <ContactFormUI
      formRef={formRef}
      onSubmit={onSubmit}
      isProcessing={isProcessing}
      clientErrors={clientErrors}
      serverErrors={[]}
      succeeded={localSucceeded || state.succeeded}
      formspreeErrors={state.errors}
      submitting={state.submitting}
    />
  );
}

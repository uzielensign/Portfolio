"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

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

  if (mode === 'client') {
    return <ContactFormWithHook formId={ENV_FORMSPREE_FORM_ID!} />;
  }

  return <ContactFormServerOnly />;
}

// Inner component that uses hooks — it's safe because it's only rendered when a valid formId exists.
function ContactFormWithHook({ formId }: { formId: string }): React.ReactElement {
  // Normalize formId: allow env var to be either "mvgwbnvd" or "f/mvgwbnvd" and strip the leading "f/" if present.
  const normalizedId = formId && formId.startsWith("f/") ? formId.slice(2) : formId;
  // We only need the hook state for rendering; avoid assigning the unused handleSubmit to satisfy lint rules
  const [state] = useForm(normalizedId);
  const [clientErrors, setClientErrors] = useState<Record<string, string | null>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [localSucceeded, setLocalSucceeded] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function validateEmail(email: string) {
    // Simple RFC-5322-ish regex for basic validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function submitFromElement(formEl: HTMLFormElement | null) {
    if (!formEl) return;
    setClientErrors({});
    setIsProcessing(true);

    const form = new FormData(formEl);
    const honeypot = (form.get("hp") || "").toString().trim();
    if (honeypot) {
      console.debug('[ContactForm] honeypot filled, ignoring submission (programmatic)');
      setIsProcessing(false);
      return;
    }

    const firstName = (form.get("firstName") || "").toString().trim();
    const lastName = (form.get("lastName") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const message = (form.get("message") || "").toString().trim();

    const errors: Record<string, string> = {};
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!validateEmail(email)) errors.email = "Please enter a valid email address.";
    if (!message) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      setIsProcessing(false);
      return;
    }

    // Programmatically POST to our server-side proxy which forwards to Formspree.
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setLocalSucceeded(true);
      } else {
        // Attempt to parse and show server-side errors
        try {
          const data = await response.json();
          console.error('[ContactForm] /api/contact error response', data);
          if (data && data.errors && Array.isArray(data.errors)) {
            // Safely normalize server error objects without using `any`.
            type FormspreeError = { message?: unknown };
            const serverMessage = (data.errors as unknown[])
              .map((e) => {
                if (typeof e === 'object' && e !== null && 'message' in e) {
                  const m = (e as FormspreeError).message;
                  return typeof m === 'string' ? m : JSON.stringify(m);
                }
                return String(e);
              })
              .join(' ');
            setClientErrors({ _server: serverMessage });
          } else if (data && data.error) {
            setClientErrors({ _server: String(data.error) });
          }
        } catch (jsonErr) {
          console.error('[ContactForm] failed to parse /api/contact error response', jsonErr);
        }
      }
    } catch (err) {
      console.error('[ContactForm] programmatic submit fetch error to /api/contact', err);
      setClientErrors({ _server: 'Network error while submitting the form.' });
    } finally {
      setIsProcessing(false);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent native HTML submit behavior and route through the programmatic submit path
    e.preventDefault();
    await submitFromElement(e.currentTarget as HTMLFormElement);
  };

  if (state.succeeded || localSucceeded) {
    return (
      <div className="mx-auto max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Thanks — I got your message!</h3>
        <p className="text-gray-700 dark:text-gray-300">I appreciate you reaching out. I’ll get back to you as soon as I can.</p>
      </div>
    );
  }

  // Normalize server-side errors to a typed array for safe rendering
  const serverErrors: { message?: string }[] = Array.isArray(state.errors)
    ? (state.errors as { message?: string }[])
    : [];

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mx-auto max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      {/* Honeypot - hidden from users, intended to trap bots */}
      <input name="hp" type="text" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-200">First Name <span className="text-red-500">*</span></span>
          <input
            name="firstName"
            type="text"
            className="mt-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {clientErrors.firstName && <span className="text-red-500 text-xs mt-1">{clientErrors.firstName}</span>}
        </label>

        <label className="flex flex-col text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-200">Last Name <span className="text-red-500">*</span></span>
          <input
            name="lastName"
            type="text"
            className="mt-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {clientErrors.lastName && <span className="text-red-500 text-xs mt-1">{clientErrors.lastName}</span>}
        </label>
      </div>

      <label className="flex flex-col text-sm mt-4">
        <span className="font-medium text-gray-700 dark:text-gray-200">Email <span className="text-red-500">*</span></span>
        <input
          name="email"
          type="email"
          className="mt-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {clientErrors.email && <span className="text-red-500 text-xs mt-1">{clientErrors.email}</span>}
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </label>

      {/* Message textarea */}
      <label className="flex flex-col text-sm mt-4">
        <span className="font-medium text-gray-700 dark:text-gray-200">Message <span className="text-red-500">*</span></span>
        <textarea
          name="message"
          rows={6}
          className="mt-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message here..."
        />
        {clientErrors.message && <span className="text-red-500 text-xs mt-1">{clientErrors.message}</span>}
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </label>

      <label className="flex flex-col text-sm mt-4">
        <span className="font-medium text-gray-700 dark:text-gray-200">Phone Number <span className="text-xs text-gray-500">(optional)</span></span>
        <input
          name="phone"
          type="tel"
          className="mt-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="(optional)"
        />
      </label>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => submitFromElement(formRef.current)}
          disabled={state.submitting || isProcessing}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {state.submitting || isProcessing ? "Sending..." : "Send Message"}
        </button>
        {/* Small inline feedback so clicking the button immediately shows activity */}
        {(isProcessing || state.submitting) && (
          <div className="text-sm text-gray-600 dark:text-gray-300 ml-3">Processing...</div>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400">Fields marked with <span className="text-red-500">*</span> are required.</p>
      </div>

      {/* Show server-side errors if present */}
      {serverErrors.length > 0 && (
        <div className="mt-4 text-sm text-red-600">
          {serverErrors.map((err, i) => (
            <div key={i}>{err.message}</div>
          ))}
        </div>
      )}
    </form>
  );
}

// Server-only variant: interacts only with our server API at /api/contact. This path does NOT
// require a NEXT_PUBLIC var and is safe to render when only a server-side FORMSPREE_FORM_ID exists.
function ContactFormServerOnly(): React.ReactElement {
  const [clientErrors, setClientErrors] = useState<Record<string, string | null>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [localSucceeded, setLocalSucceeded] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function submitFromElement(formEl: HTMLFormElement | null) {
    if (!formEl) return;
    setClientErrors({});
    setIsProcessing(true);

    const form = new FormData(formEl);
    const honeypot = (form.get("hp") || "").toString().trim();
    if (honeypot) {
      console.debug('[ContactForm] honeypot filled, ignoring submission (programmatic)');
      setIsProcessing(false);
      return;
    }

    const firstName = (form.get("firstName") || "").toString().trim();
    const lastName = (form.get("lastName") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const message = (form.get("message") || "").toString().trim();

    const errors: Record<string, string> = {};
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!validateEmail(email)) errors.email = "Please enter a valid email address.";
    if (!message) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: form });
      if (response.ok) {
        setLocalSucceeded(true);
      } else {
        try {
          const data = await response.json();
          if (data && data.errors && Array.isArray(data.errors)) {
            const serverMessage = (data.errors as unknown[])
              .map((e) => {
                if (typeof e === 'object' && e !== null && 'message' in e) {
                  const m = (e as { message?: unknown }).message;
                  return typeof m === 'string' ? m : JSON.stringify(m);
                }
                return String(e);
              })
              .join(' ');
            setClientErrors({ _server: serverMessage });
          } else if (data && data.error) {
            setClientErrors({ _server: String(data.error) });
          }
        } catch (jsonErr) {
          setClientErrors({ _server: 'Server error while submitting the form.' });
        }
      }
    } catch (err) {
      setClientErrors({ _server: 'Network error while submitting the form.' });
    } finally {
      setIsProcessing(false);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitFromElement(e.currentTarget as HTMLFormElement);
  };

  if (localSucceeded) {
    return (
      <div className="mx-auto max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Thanks — I got your message!</h3>
        <p className="text-gray-700 dark:text-gray-300">I appreciate you reaching out. I’ll get back to you as soon as I can.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mx-auto max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <input name="hp" type="text" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-200">First Name <span className="text-red-500">*</span></span>
          <input name="firstName" type="text" className="mt-1 px-3 py-2 rounded-md border border-gray-300" />
          {clientErrors.firstName && <span className="text-red-500 text-xs mt-1">{clientErrors.firstName}</span>}
        </label>

        <label className="flex flex-col text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-200">Last Name <span className="text-red-500">*</span></span>
          <input name="lastName" type="text" className="mt-1 px-3 py-2 rounded-md border border-gray-300" />
          {clientErrors.lastName && <span className="text-red-500 text-xs mt-1">{clientErrors.lastName}</span>}
        </label>
      </div>

      <label className="flex flex-col text-sm mt-4">
        <span className="font-medium text-gray-700 dark:text-gray-200">Email <span className="text-red-500">*</span></span>
        <input name="email" type="email" className="mt-1 px-3 py-2 rounded-md border border-gray-300" />
        {clientErrors.email && <span className="text-red-500 text-xs mt-1">{clientErrors.email}</span>}
      </label>

      <label className="flex flex-col text-sm mt-4">
        <span className="font-medium text-gray-700 dark:text-gray-200">Message <span className="text-red-500">*</span></span>
        <textarea name="message" rows={6} className="mt-1 px-3 py-2 rounded-md border border-gray-300" placeholder="Write your message here..." />
        {clientErrors.message && <span className="text-red-500 text-xs mt-1">{clientErrors.message}</span>}
      </label>

      <div className="mt-6 flex items-center justify-between">
        <button type="submit" disabled={isProcessing} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50">
          {isProcessing ? 'Sending...' : 'Send Message'}
        </button>
        {(isProcessing) && <div className="text-sm text-gray-600 ml-3">Processing...</div>}
        <p className="text-sm text-gray-600">Fields marked with <span className="text-red-500">*</span> are required.</p>
      </div>

      {clientErrors._server && (
        <div className="mt-4 text-sm text-red-600">{clientErrors._server}</div>
      )}
    </form>
  );
}

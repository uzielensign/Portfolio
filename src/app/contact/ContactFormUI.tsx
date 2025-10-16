"use client";
import React from "react";

type Props = {
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  isProcessing: boolean;
  clientErrors: Record<string, string | null>;
  serverErrors?: { message?: string }[];
  succeeded: boolean;
  formspreeErrors?: unknown[];
  submitting?: boolean;
};

export default function ContactFormUI({
  formRef,
  onSubmit,
  isProcessing,
  clientErrors,
  serverErrors = [],
  succeeded,
  formspreeErrors = [],
  submitting = false,
}: Props) {
  if (succeeded) {
    return (
      <div className="mx-auto max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Thanks — I got your message!</h3>
        <p className="text-gray-700 dark:text-gray-300">I appreciate you reaching out. I’ll get back to you as soon as I can.</p>
      </div>
    );
  }

  // Combine server-side errors (from either our hook or formspree state).
  // Previously an empty `formspreeErrors` array would shadow `serverErrors`.
  // Now we merge both sources so callers may pass either one.
  const normalizedFormspreeErrors: { message?: string }[] = Array.isArray(formspreeErrors)
    ? (formspreeErrors as unknown[]).map((e) => {
        if (typeof e === 'object' && e !== null && 'message' in e) {
          const m = (e as { message?: unknown }).message;
          return { message: typeof m === 'string' ? m : JSON.stringify(m) };
        }
        return { message: String(e) };
      })
    : [];

  const _serverErrors: { message?: string }[] = [
    ...(Array.isArray(serverErrors) ? serverErrors : []),
    ...normalizedFormspreeErrors,
  ];

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mx-auto max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
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
      </label>

      <label className="flex flex-col text-sm mt-4">
        <span className="font-medium text-gray-700 dark:text-gray-200">Message <span className="text-red-500">*</span></span>
        <textarea
          name="message"
          rows={6}
          className="mt-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message here..."
        />
        {clientErrors.message && <span className="text-red-500 text-xs mt-1">{clientErrors.message}</span>}
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

      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3">
        <button
          type="submit"
          disabled={submitting || isProcessing}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 sm:py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {(submitting || isProcessing) ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <span>Send Message</span>
          )}
        </button>

        <div className="flex items-center gap-3 sm:gap-4 justify-between w-full sm:w-auto">
          {(isProcessing || submitting) && (
            <div className="text-sm text-gray-600 dark:text-gray-300">Processing...</div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-left sm:text-right">Fields marked with <span className="text-red-500">*</span> are required.</p>
        </div>
      </div>

      {(_serverErrors && _serverErrors.length > 0) && (
        <div className="mt-4 text-sm text-red-600">
          {_serverErrors.map((err, i) => (
            <div key={i}>{err.message}</div>
          ))}
        </div>
      )}
    </form>
  );
}

"use client";
import { useRef, useState } from "react";

export type ClientErrors = Record<string, string | null>;

export function useContactForm(endpoint = "/api/contact") {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [localSucceeded, setLocalSucceeded] = useState(false);
  // Whether the server responded in dev "mock" mode (not forwarded to Formspree)
  const [isMocked, setIsMocked] = useState(false);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function submitFromElement(formEl: HTMLFormElement | null) {
    if (!formEl) return false;
    setClientErrors({});
    setIsMocked(false);
    setIsProcessing(true);

    const form = new FormData(formEl);
    const honeypot = (form.get("hp") || "").toString().trim();
    if (honeypot) {
      // silent ignore for bots
      setIsProcessing(false);
      return false;
    }

    const firstName = (form.get("firstName") || "").toString().trim();
    const lastName = (form.get("lastName") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const message = (form.get("message") || "").toString().trim();

    const errors: Record<string, string> = {};
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!validateEmail(email))
      errors.email = "Please enter a valid email address.";
    if (!message) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      setIsProcessing(false);
      return false;
    }

    try {
      const response = await fetch(endpoint, { method: "POST", body: form });
      if (response.ok) {
        // Try to detect server dev/mock response which signals the submission wasn't forwarded
        try {
          const ct = response.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            const data = await response.clone().json();
            if (data && data.mocked) {
              setIsMocked(true);
            }
          }
        } catch {
          // ignore parse errors
        }
        setLocalSucceeded(true);
        return true;
      } else {
        try {
          const data = await response.json();
          if (data && data.errors && Array.isArray(data.errors)) {
            const serverMessage = (data.errors as unknown[])
              .map((e) => {
                if (typeof e === "object" && e !== null && "message" in e) {
                  const m = (e as { message?: unknown }).message;
                  return typeof m === "string" ? m : JSON.stringify(m);
                }
                return String(e);
              })
              .join(" ");
            setClientErrors({ _server: serverMessage });
          } else if (data && data.error) {
            setClientErrors({ _server: String(data.error) });
          }
        } catch (jsonErr) {
          console.error(
            "[ContactForm] failed to parse /api/contact error response",
            jsonErr,
          );
        }
        return false;
      }
    } catch (err) {
      console.error(
        "[ContactForm] programmatic submit fetch error to /api/contact",
        err,
      );
      setClientErrors({ _server: "Network error while submitting the form." });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitFromElement(e.currentTarget as HTMLFormElement);
  };

  return {
    formRef,
    clientErrors,
    setClientErrors,
    isProcessing,
    localSucceeded,
    isMocked,
    onSubmit,
  } as const;
}

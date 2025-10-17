"use client";
import React from "react";
import useTheme from "../../hooks/useTheme";
import ContactForm from "./ContactForm";
import Header from "../../components/Header";

export default function Contact() {
  const { isDark } = useTheme();
  // Render page immediately; show animated background only if theme is dark
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center px-4 pt-[var(--header-height,3rem)] relative overflow-hidden font-sans">
        {/* Animated background only when theme is dark */}
        {isDark === true && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="hero-gradient-bg"></div>
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-0"
            >
              <div className="absolute animate-blob1 -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-800/40 via-blue-800/30 to-pink-800/30 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute animate-blob2 top-40 right-[-200px] w-[400px] h-[400px] bg-gradient-to-br from-pink-800/30 via-blue-800/20 to-pink-800/20 rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>
        )}
        <section className="max-w-2xl w-full relative z-10 font-sans pt-8">
          <h1 className="page-title text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth">
            Contact
          </h1>
          <div className="prose mx-auto text-center mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              If you’d like to contact me, please fill out the form below.
            </p>
          </div>
          {/* Contact form: set NEXT_PUBLIC_FORMSPREE_FORM_ID in your environment or replace with your Formspree form ID */}
          <ContactForm />
        </section>
      </main>
    </>
  );
}

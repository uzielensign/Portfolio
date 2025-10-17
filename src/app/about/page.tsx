"use client";
import React from "react";
import useTheme from "@/hooks/useTheme";

export default function About() {
  // Run theme hook for client-side theme sync
  useTheme();

  // Gradient text class for name emphasis
  const gradientTextClass =
    "inline align-middle leading-none p-0 m-0 h-auto gradient-inline-fix animate-gradient-move-smooth bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent";

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center px-4 pt-12 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Animated background only in dark mode */}
      <div className="absolute inset-0 z-0 pointer-events-none dark:block hidden">
        <div className="hero-gradient-bg"></div>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div className="absolute animate-blob1 -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-800/40 via-blue-800/30 to-pink-800/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute animate-blob2 top-40 right-[-200px] w-[400px] h-[400px] bg-gradient-to-br from-pink-800/30 via-blue-800/20 to-pink-800/20 rounded-full blur-2xl opacity-60"></div>
        </div>
      </div>
      <section className="max-w-3xl w-full py-16 relative z-10 font-sans">
        <h1 className="page-title about-heading pull-up text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth">
          About
        </h1>
        <div className="mx-4 sm:mx-6 about-card bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8">
            <div className="w-28 h-28 md:w-40 md:h-48 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 dark:from-indigo-700 dark:to-pink-700 flex items-center justify-center text-3xl font-bold text-white mb-2 md:mb-0 shadow-lg ring-1 ring-white/60 dark:ring-black/40 transition-transform transform hover:scale-105">
              AS
            </div>
            <div className="text-left flex-1">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed tracking-wide text-gray-700 dark:text-gray-300 mb-4 max-w-prose">
                Hi, I&apos;m{" "}
                <span
                  className={`${gradientTextClass} text-lg sm:text-xl md:text-2xl font-semibold`}
                >
                  Arni Sanchez
                </span>
                , a passionate React and TypeScript developer. I love crafting
                modern, responsive web applications and continually learning new
                technologies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

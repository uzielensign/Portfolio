"use client";
import React from "react";
import { projects } from "@/data/projects";
import useTheme from "@/hooks/useTheme";

export default function Projects() {
  const { isDark } = useTheme();
  if (isDark === null) return null;
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center px-4 pt-12 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Animated background only in dark mode */}
      <div className="absolute inset-0 z-0 pointer-events-none dark:block hidden">
        <div className="hero-gradient-bg"></div>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute animate-blob1 -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-800/40 via-blue-800/30 to-pink-800/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute animate-blob2 top-40 right-[-200px] w-[400px] h-[400px] bg-gradient-to-br from-pink-800/30 via-blue-800/20 to-pink-800/20 rounded-full blur-2xl opacity-60"></div>
          {/* purple blob removed to eliminate light purple shader */}
        </div>
      </div>

      <section className="max-w-6xl w-full relative z-10 font-sans pt-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="page-title text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth">Projects</h1>
        </div>

        {/* More impactful grid: featured first card spans columns, others form a balanced grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
          {projects.map((p, idx) => (
            // First project becomes a featured card that spans two columns on md+ screens
            idx === 0 ? (
              <article
                key={p.id}
                className="relative p-6 md:col-span-2 bg-transparent dark:bg-gray-800/75 rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(2,6,23,0.4)] transform hover:-translate-y-2 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {/* Cover / visual area (fixed height 532px) */}
                <div className="w-full rounded-lg overflow-hidden mb-4 bg-white dark:bg-gradient-to-tr dark:from-indigo-700 dark:to-pink-700 h-[332px] flex items-end">
                  <div className="p-4 backdrop-blur-sm bg-gradient-to-t from-black/30 to-transparent w-full text-white">
                    <h3 className="text-lg md:text-2xl font-bold">{p.title}</h3>
                  </div>
                </div>

                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">{p.summary}</p>

                <div className="flex items-center justify-between gap-4">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} source in new tab`}
                    title={`Open ${p.title} source (opens in a new tab)`}
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
                  >
                    Open Repo
                    <svg aria-hidden="true" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5" />
                      <path d="M19 5v6H13" />
                    </svg>
                  </a>
                </div>
              </article>
            ) : idx === 1 ? (
              // Make the second project intentionally different (taller visual but single column)
              <article
                key={p.id}
                className="relative p-6 bg-transparent dark:bg-gray-800/70 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="w-full rounded-md bg-white dark:bg-gray-700 h-[332px] mb-4 flex items-end justify-start p-3">
                  <h3 className="text-base md:text-lg font-semibold text-black dark:text-white">{p.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{p.summary}</p>

                <div className="mt-auto flex items-center gap-3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} source in new tab`}
                    title={`Open ${p.title} source (opens in a new tab)`}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
                  >
                    <span className="hidden sm:inline">Open Repo</span>
                    <svg aria-hidden="true" className="inline-block w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5" />
                      <path d="M19 5v6H13" />
                    </svg>
                  </a>
                </div>
              </article>
            ) : (
              <article
                key={p.id}
                className="relative p-6 bg-transparent dark:bg-gray-800/70 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="w-full rounded-md bg-white dark:bg-gray-700 h-[332px] mb-4 flex items-end justify-start p-3">
                  <h3 className="text-base font-semibold text-black dark:text-white">{p.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{p.summary}</p>

                <div className="mt-auto flex items-center gap-3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} source in new tab`}
                    title={`Open ${p.title} source (opens in a new tab)`}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
                  >
                    <span className="hidden sm:inline">Open Repo</span>
                    <svg aria-hidden="true" className="inline-block w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5" />
                      <path d="M19 5v6H13" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          ))}
        </div>
      </section>
    </main>
  );
}

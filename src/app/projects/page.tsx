"use client";
import React from "react";
import { projects } from "@/data/projects";
import useTheme from "@/hooks/useTheme";

export default function Projects() {
  // Run the theme hook so it can sync the theme class/localStorage on the client.
  // We don't need the `isDark` value here, so avoid destructuring it to prevent
  // an unused-variable lint warning.
  useTheme();

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
          {/* purple blob removed to eliminate light purple shader */}
        </div>
      </div>

      <section className="max-w-6xl w-full relative z-10 font-sans pt-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="page-title text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth">
            Projects
          </h1>
        </div>

        {/* More impactful grid: featured first card spans columns, others form a balanced grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
          {projects.map((p, idx) =>
            // First project becomes a featured card that spans two columns on md+ screens
            idx === 0 ? (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title} source in new tab`}
                title={`Open ${p.title} source (opens in a new tab)`}
                className="group block md:col-span-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
              >
                <article className="relative p-8 md:p-10 bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl dark:shadow-sm hover:shadow-[0_20px_40px_rgba(2,6,23,0.4)] dark:hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none flex flex-col h-full">
                  {/* Cover / visual area (centered title) */}
                  <div className="relative w-full rounded-lg overflow-hidden mb-4 bg-white dark:bg-gray-700 h-48 md:h-[248px]">
                    {/* bottom-only gradient overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                    {/* title sits above the overlay at the bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                      <h3 className="text-lg md:text-3xl lg:text-4xl font-extrabold leading-tight text-white text-center">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm md:text-base leading-relaxed text-center text-gray-700 dark:text-gray-300 mt-4">
                    {p.summary}
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    {/* visual affordance for clickable card could go here if desired */}
                  </div>
                </article>
              </a>
            ) : idx === 1 ? (
              // Make the second project intentionally different (taller visual but single column)
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title} source in new tab`}
                title={`Open ${p.title} source (opens in a new tab)`}
                className="group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
              >
                <article className="relative p-6 md:p-8 bg-white/95 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-[0_18px_36px_rgba(15,23,42,0.08)] dark:shadow-sm ring-2 ring-gray-200 dark:ring-0 hover:shadow-[0_22px_45px_rgba(15,23,42,0.12)] dark:hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none flex flex-col h-full">
                  <div className="relative w-full rounded-lg overflow-hidden mb-4 bg-gray-50 dark:bg-gray-700 h-48 md:h-[248px] ring-1 ring-gray-50 border border-gray-50 shadow-inner">
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                      <h3 className="text-base md:text-lg font-semibold text-center">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                    {p.summary}
                  </p>

                  <div className="mt-auto flex items-center gap-3">
                    {/* button removed; card is clickable via outer anchor */}
                  </div>
                </article>
              </a>
            ) : (
              <article
                key={p.id}
                className="relative p-6 bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative w-full rounded-md bg-white dark:bg-gray-700 h-48 md:h-[248px] mb-4 p-3">
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-full p-0 z-10 flex items-center justify-center h-12 md:h-16">
                    <h3 className="text-base font-semibold text-black dark:text-white text-center">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {p.summary}
                </p>

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
                    <svg
                      aria-hidden="true"
                      className="inline-block w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 19L19 5" />
                      <path d="M19 5v6H13" />
                    </svg>
                  </a>
                </div>
              </article>
            ),
          )}
        </div>
      </section>
    </main>
  );
}

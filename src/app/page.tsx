import React from "react";
import { projects } from "@/data/projects";
import ContactForm from "./contact/ContactForm";

export default function Home() {
  // Tailwind classes for consistent styling
  const imClass =
    "inline-block font-extrabold not-italic normal-case leading-tight text-black dark:text-white";
  const gradientTextClass =
    "inline align-middle leading-none p-0 m-0 h-auto gradient-inline-fix animate-gradient-move-smooth bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent";
  const sectionHeadingClass =
    "text-4xl md:text-5xl font-extrabold text-center mb-6";

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-8 md:pt-14 transition-colors duration-300 relative overflow-x-hidden bg-white dark:bg-gray-900 font-sans">
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

      <section id="home" className="relative z-10 max-w-3xl w-full flex flex-col items-center justify-center pt-6 gap-6 text-center font-sans">
        <div className="flex-1 flex flex-col items-center w-full font-sans mt-6 md:mt-0">
          <h1 className="mt-2 md:mt-0 text-3xl sm:text-5xl md:text-6xl font-extrabold text-center mb-1 leading-tight tracking-tight sm:tracking-tighter flex items-baseline justify-center gap-x-0.5 sm:gap-x-2">
            <span className={gradientTextClass}>Hi,</span>
            <span className={imClass}>I&apos;m</span>
            <span className={gradientTextClass}>Arni Sanchez</span>
          </h1>

          <h2 className="text-lg md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-3">
            <span className="slide-in-left">
              Self-Motivated Learner &amp; Passionate Technologist
            </span>
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-center text-gray-700 dark:text-gray-300 mb-6 max-w-prose mx-auto">
            Dedicated to mastering new skills and delivering innovative
            solutions. I thrive on challenges and am committed to continuous
            growth in the ever-evolving world of technology.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="w-full bg-white dark:bg-gray-900 flex flex-col items-center px-4 py-16"
      >
        <div className="max-w-3xl w-full">
          <h2 className={sectionHeadingClass}>
            <span className={gradientTextClass}>About</span>
          </h2>
          <div className="mx-4 sm:mx-6 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-8">
              <div className="w-28 h-28 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 dark:from-indigo-700 dark:to-pink-700 flex items-center justify-center text-3xl font-bold text-white mb-2 md:mb-0 shadow-lg ring-1 ring-white/60 dark:ring-black/40 transition-transform transform hover:scale-105">
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
                  modern, responsive web applications and continually learning
                  new technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="w-full bg-white dark:bg-gray-900 flex flex-col items-center px-4 py-16"
      >
        <div className="max-w-6xl w-full relative">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className={sectionHeadingClass}>
              <span className={gradientTextClass}>Projects</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4">
            {projects.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title}`}
                className={`block h-full ${p.id === "portfolio" ? "md:col-span-3" : "md:col-span-1"} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900`}
              >
                <article
                  className={`relative ${p.id === "portfolio" ? "p-8 md:p-10" : "p-6 md:p-8"} bg-white/80 dark:bg-gray-800/75 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(2,6,23,0.4)] transform hover:-translate-y-2 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none flex flex-col h-full`}
                >
                  <div className="relative w-full rounded-lg overflow-hidden mb-4 bg-gradient-to-tr from-indigo-700 to-pink-700 h-48 md:h-[248px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                      <h3
                        className={
                          p.id === "portfolio"
                            ? "text-lg md:text-3xl lg:text-4xl font-extrabold leading-tight text-white text-center"
                            : "text-base md:text-xl font-semibold leading-tight text-white text-center"
                        }
                      >
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-center text-gray-700 dark:text-gray-300 mt-4">
                    {p.summary}
                  </p>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="w-full bg-white dark:bg-gray-900 flex flex-col items-center px-4 py-16 relative z-10"
      >
        <div className="max-w-2xl w-full">
          <h2 className={sectionHeadingClass}>
            <span className={gradientTextClass}>Contact</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
            If you’d like to contact me, please fill out the form below.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

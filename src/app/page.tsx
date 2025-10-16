import React from "react";
import { projects } from "@/data/projects";
import ContactForm from "./contact/ContactForm";

export default function Home() {
  // Server component: render immediately on the server.
  // Theme hydration is handled by the client-side theme-init script and client components.

  // Always use Tailwind's dark: variant so the span is black in light mode and white in dark mode
  const imClass = "inline-block font-extrabold not-italic normal-case leading-tight text-black dark:text-white";

  // Keep gradient applied in both themes so these elements continue changing colors
  const gradientTextClass = "inline align-middle leading-none p-0 m-0 h-auto gradient-inline-fix animate-gradient-move-smooth bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent";

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-8 md:pt-14 transition-colors duration-300 relative overflow-x-hidden bg-white dark:bg-gray-900 font-sans">
      {/* Animated background only in dark mode */}
      <div className="absolute inset-0 z-0 pointer-events-none dark:block hidden">
        <div className="hero-gradient-bg"></div>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute animate-blob1 -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-800/40 via-blue-800/30 to-pink-800/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute animate-blob2 top-40 right-[-200px] w-[400px] h-[400px] bg-gradient-to-br from-pink-800/30 via-blue-800/20 to-pink-800/20 rounded-full blur-2xl opacity-60"></div>
          {/* purple blob removed to eliminate light purple shader */}
        </div>
      </div>

      <section className="relative z-10 max-w-3xl w-full flex flex-col items-center justify-center pt-6 gap-6 text-center font-sans">
        {/* Content centered upper-middle */}
        <div className="flex-1 flex flex-col items-center w-full font-sans mt-6 md:mt-0">
          <h1 className="mt-2 md:mt-0 text-3xl sm:text-5xl md:text-6xl font-extrabold text-center mb-1 leading-tight tracking-tight sm:tracking-tighter flex items-baseline justify-center gap-x-0.5 sm:gap-x-2">
            <span className={gradientTextClass}>
              Hi,
            </span>
            <span className={imClass}>
              I&apos;m
            </span>
            <span className={gradientTextClass}>
              Arni Sanchez
            </span>
          </h1>

          {/* Decorative GIF placed between the heading and the subheading. */}
          {/* Drop your GIF file into `public/hero.gif` and it will render here. */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-poster.png"
            className="w-48 sm:w-64 md:w-80 mt-4 mb-3 rounded-lg object-contain"
            aria-hidden="true"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          <h2 className="text-lg md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-3">
            <span className="slide-in-left">Self-Motivated Learner &amp; Passionate Technologist</span>
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-center text-gray-700 dark:text-gray-300 mb-6 max-w-prose mx-auto">
            Dedicated to mastering new skills and delivering innovative solutions. I thrive on challenges and am committed to continuous growth in the ever-evolving world of technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition animate-gradient-move"
            >
              View Projects
            </a>
            <a
              href="#about"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-full font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              About Me
            </a>
            <a
              href="#contact"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-full font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (inline) */}
      <section id="about" className="w-full bg-white dark:bg-gray-900 flex flex-col items-center px-4 py-16">
        <div className="max-w-3xl w-full">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6"><span className={gradientTextClass}>About</span></h2>
          <div className="mx-4 sm:mx-6 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-28 h-28 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 dark:from-indigo-700 dark:to-pink-700 flex items-center justify-center text-3xl font-bold text-white mb-2 md:mb-0 shadow-lg ring-1 ring-white/60 dark:ring-black/40 transition-transform transform hover:scale-105">
                AS
              </div>

              <div className="text-left flex-1">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed max-w-prose">
                  Hi, I&apos;m <span className="text-black dark:text-gray-100 font-bold">Arni Sanchez</span>, a passionate React and TypeScript developer. I love crafting modern, responsive web applications and continually learning new technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION (inline) */}
      <section id="projects" className="w-full bg-white dark:bg-gray-900 flex flex-col items-center px-4 py-16">
        <div className="max-w-6xl w-full relative">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3"><span className={gradientTextClass}>Projects</span></h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {projects.map((p, idx) => (
              idx === 0 ? (
                <article key={p.id} className="relative p-6 md:col-span-2 bg-transparent dark:bg-gray-800/75 rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(2,6,23,0.4)] transform hover:-translate-y-2 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none">
                  <div className="w-full rounded-lg overflow-hidden mb-4 bg-gradient-to-tr from-indigo-700 to-pink-700 h-64 md:h-[372px] flex items-end">
                    <div className="p-4 backdrop-blur-sm bg-gradient-to-t from-black/30 to-transparent w-full text-white">
                      <h3 className="text-lg md:text-2xl font-bold text-white">{p.title}</h3>
                    </div>
                  </div>

                  <p className="text-base text-gray-700 dark:text-gray-300 mb-4">{p.summary}</p>

                  <div className="flex items-center justify-between gap-4">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm shadow-lg hover:bg-indigo-700">
                      Open Repo
                    </a>
                  </div>
                </article>
              ) : (
                <article key={p.id} className="relative p-6 bg-transparent dark:bg-gray-800/70 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none">
                  <div className="w-full rounded-lg overflow-hidden mb-4 bg-gradient-to-tr from-indigo-700 to-pink-700 h-64 md:h-[372px] flex items-end">
                    <div className="p-4 backdrop-blur-sm bg-gradient-to-t from-black/30 to-transparent w-full text-white">
                      <h3 className="text-lg md:text-2xl font-bold text-white">{p.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{p.summary}</p>

                  <div className="mt-auto flex items-center gap-3">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm shadow-sm hover:bg-indigo-700">
                      <span className="hidden sm:inline">Open Repo</span>
                    </a>
                  </div>
                </article>
              )
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (inline) */}
      <section id="contact" className="w-full bg-white dark:bg-gray-900 flex flex-col items-center px-4 py-16 relative z-10">
        <div className="max-w-2xl w-full">
          <h2 className="text-4xl font-extrabold text-center mb-6"><span className={gradientTextClass}>Contact</span></h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">If you’d like to contact me, please fill out the form below.</p>
          <ContactForm />
        </div>
      </section>

    </main>
  );
}

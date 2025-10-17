"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Gradient text class for animated headings/inline text
  const gradientTextClass =
    "inline align-middle leading-none p-0 m-0 h-auto gradient-inline-fix animate-gradient-move-smooth bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text";

  useEffect(() => {
    // Update CSS variable with header height for anchor scroll-padding
    function updateHeaderHeight() {
      const el = headerRef.current;
      if (!el || typeof document === "undefined") return;
      const height = Math.round(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`,
      );
    }

    // Debounced update to avoid rapid thrashing
    let timeout: number | undefined;
    function debouncedUpdate() {
      if (typeof window === "undefined") return;
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        updateHeaderHeight();
        timeout = undefined;
      }, 50) as unknown as number;
    }

    debouncedUpdate();
    window.addEventListener("resize", debouncedUpdate);

    // Use ResizeObserver or MutationObserver for efficient updates
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;
    const target = headerRef.current;
    interface WindowWithRO extends Window {
      ResizeObserver?: typeof ResizeObserver;
    }
    const win = window as unknown as WindowWithRO;
    if (typeof win.ResizeObserver === "function" && target) {
      ro = new win.ResizeObserver(() => debouncedUpdate());
      try {
        ro?.observe(target);
      } catch {}
    } else if (target) {
      mo = new MutationObserver(() => debouncedUpdate());
      try {
        mo.observe(target, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      } catch {}
    }

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      if (ro)
        try {
          ro.disconnect();
        } catch {}
      if (mo)
        try {
          mo.disconnect();
        } catch {}
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  // Define a constant for default header height
  const DEFAULT_HEADER_HEIGHT = 64;

  // Scroll to top
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Ensure scrolling works for the main element
      const main = document.querySelector("main");
      if (main) {
        main.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.warn("Main element not found. Falling back to window scroll.");
      }
    } else {
      console.error("Window is undefined. Cannot scroll to top.");
    }
  };

  // Scroll to anchor and close mobile menu
  const scrollToAnchor = (id: string) => {
    if (typeof document === "undefined") return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        history.replaceState(null, "", `#${id}`);
      } catch {}
    }
    setMenuOpen(false);
  };

  // Handle navigation click
  const handleNavClick = (anchor?: string) => {
    if (anchor === "home") {
      scrollToTop(); // Scroll to the very top of the page
    } else if (anchor) {
      scrollToAnchor(anchor);
    }
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-black/40 backdrop-blur-md transition-colors duration-500 ease-in-out border-b border-transparent dark:border-gray-800 shadow-sm"
      style={{ transition: "background-color 0.5s, border-color 0.5s" }}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Home button in the top left */}
          <div className="flex-shrink-0">
            <button
              data-testid="home-btn"
              onClick={() => {
                // Use Next.js router to always navigate to the homepage
                router.push("/");
              }}
              className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth focus:outline-none"
              style={{ cursor: "pointer" }}
            >
              Home
            </button>
          </div>
          <nav className="hidden md:flex flex-row gap-x-6">
            <button
              className="nav-link text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth focus:outline-none"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                color: "transparent",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                cursor: "pointer",
                border: "none",
                padding: 0,
                margin: 0,
              }}
              onClick={() => handleNavClick("about")}
            >
              About
            </button>
            <button
              className="nav-link text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth focus:outline-none"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                color: "transparent",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                cursor: "pointer",
                border: "none",
                padding: 0,
                margin: 0,
              }}
              onClick={() => handleNavClick("projects")}
            >
              Projects
            </button>
            <button
              className="nav-link text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth focus:outline-none"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                color: "transparent",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                cursor: "pointer",
                border: "none",
                padding: 0,
                margin: 0,
              }}
              onClick={() => handleNavClick("contact")}
            >
              Contact
            </button>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl">
              {menuOpen ? "\u2716" : "\u2630"}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-full right-0 w-40 bg-white/70 dark:bg-black/60 backdrop-blur-sm shadow-lg rounded-l-xl z-50 md:hidden flex flex-col py-1 gap-1 transition-colors duration-500">
          <button
            className="block w-full text-left text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth focus:outline-none px-4 py-1"
            onClick={() => handleNavClick("about")}
          >
            About
          </button>
          <button
            className="block w-full text-left text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth focus:outline-none px-4 py-1"
            onClick={() => handleNavClick("projects")}
          >
            Projects
          </button>
          <button
            className="block w-full text-left text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-move-smooth focus:outline-none px-4 py-1"
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}

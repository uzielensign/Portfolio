"use client";
import React, { useEffect, useRef } from "react";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Update CSS variable with header height so anchor scroll-padding-top matches actual size
    function updateHeaderHeight() {
      const el = headerRef.current;
      if (!el || typeof document === "undefined") return;
      const height = Math.round(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    }

    // Debounce updates so we don't thrash during many rapid mutations
    let timeout: number | undefined;
    function debouncedUpdate() {
      if (typeof window === 'undefined') return;
      if (timeout) window.clearTimeout(timeout);
      // Use a short delay to batch synchronous changes
      timeout = window.setTimeout(() => {
        updateHeaderHeight();
        timeout = undefined;
      }, 50) as unknown as number;
    }

    // Initial measurement
    debouncedUpdate();

    // Re-measure on resize
    window.addEventListener("resize", debouncedUpdate);

    // Prefer ResizeObserver (efficient) when available
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;
    const target = headerRef.current;
    // Avoid using `any` — give window a narrow type that may include ResizeObserver in some envs
    interface WindowWithRO extends Window {
      ResizeObserver?: typeof ResizeObserver;
    }
    const win = (window as unknown as WindowWithRO);
    if (typeof win.ResizeObserver === 'function' && target) {
      ro = new win.ResizeObserver(() => debouncedUpdate());
      try {
        ro?.observe(target);
      } catch {
        // ignore observe errors in some test environments
      }
    } else if (target) {
      // Fallback: observe only the header element for subtree/attribute changes
      mo = new MutationObserver(() => debouncedUpdate());
      try {
        mo.observe(target, { attributes: true, childList: true, subtree: true });
      } catch {
        // ignore errors in constrained environments
      }
    }

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      if (ro) try { ro.disconnect(); } catch { /* noop */ }
      if (mo) try { mo.disconnect(); } catch { /* noop */ }
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  // Helper to scroll to top; avoid calling window in SSR
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    // Keep header `fixed` so it stays visible at the top of the viewport at all times.
    <header ref={headerRef} className="w-full border-b bg-white/50 dark:bg-black/50 fixed top-0 left-0 z-40">
      <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          {/* Home button: scroll to top when clicked */}
          <button
            type="button"
            onClick={scrollToTop}
            className="font-semibold text-black dark:text-gray-100 hover:underline"
            aria-label="Go to top"
          >
            Home
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Reordered links: About, Projects, Contact */}
          <a href="#about" className="text-sm text-black dark:text-gray-100">
            About
          </a>
          <a href="#projects" className="text-sm text-black dark:text-gray-100">
            Projects
          </a>
          <a href="#contact" className="text-sm text-black dark:text-gray-100">
            Contact
          </a>
        </div>

        {/* No back-to-top arrow/button */}
      </nav>
    </header>
  );
}

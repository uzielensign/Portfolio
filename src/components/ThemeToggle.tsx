"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({ isDark, toggleTheme }: Props) {
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    // trigger theme toggle (parent handles theme state)
    toggleTheme();
    // trigger a tiny local animation for feedback
    setAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // cast to number for TS (window.setTimeout returns number in browsers)
    timeoutRef.current = window.setTimeout(() => {
      setAnimating(false);
      timeoutRef.current = null;
    }, 200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-gray-200/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 p-1 sm:p-2 rounded-md transition-shadow duration-150 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      title="Toggle theme"
    >
      {/* Render both icons so server/client HTML match; CSS toggles visibility */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-4 h-4 sm:w-5 sm:h-5 block dark:hidden transform transition-transform duration-200 motion-reduce:transform-none motion-reduce:transition-none ${
          animating ? "scale-110 rotate-12" : "scale-100"
        }`}
        aria-hidden="true"
      >
        <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm5.657 3.343a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM21 11a1 1 0 110 2h-1a1 1 0 110-2h1zM6.05 5.636a1 1 0 011.414 0l.707.707A1 1 0 016.757 7.757l-.707-.707a1 1 0 010-1.414zM12 18a6 6 0 100-12 6 6 0 000 12zm-9-7a1 1 0 110 2H2a1 1 0 110-2h1zM4.343 17.657a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM18.343 17.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM12 21a1 1 0 011-1v-1a1 1 0 10-2 0v1a1 1 0 011 1z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-4 h-4 sm:w-5 sm:h-5 hidden dark:block transform transition-transform duration-200 motion-reduce:transform-none motion-reduce:transition-none ${
          animating ? "scale-110 rotate-12" : "scale-100"
        }`}
        aria-hidden="true"
      >
        <path d="M21.64 13.01A9 9 0 1110.99 2.36 7 7 0 0021.64 13z" />
      </svg>
    </button>
  );
}

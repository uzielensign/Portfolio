import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeToggleWrapper from "@/components/ThemeToggleWrapper";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TITLE = "Arni Sanchez — Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of Arni Sanchez — React & TypeScript developer. Browse projects and contact information.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Inline script to initialize theme before hydration
const themeInit = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var dark = false;
    if (t === 'dark') {
      dark = true;
      document.documentElement.classList.add('dark');
    } else if (t === 'light') {
      dark = false;
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dark = true;
      document.documentElement.classList.add('dark');
    }
    // Set initial background color to avoid flicker
    try {
      var bg = dark ? '#000000' : '#ffffff';
      var style = document.createElement('style');
      style.id = 'initial-theme';
      style.appendChild(document.createTextNode('html,body{background-color:' + bg + ' !important}'));
      document.head.appendChild(style);
    } catch(e) {}
  } catch(e) {}
  // Remove temporary classes and style after hydration
  try { document.documentElement.classList.remove('no-theme-transition'); } catch (e) {}
  try { document.documentElement.classList.remove('theme-loading'); } catch (e) {}
  try {
    setTimeout(function(){
      var s = document.getElementById('initial-theme');
      if (s && s.parentNode) s.parentNode.removeChild(s);
    }, 120);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add classes to avoid color-transition flicker and initial flashes
    <html
      lang="en"
      className="no-theme-transition theme-loading bg-white dark:bg-black overflow-x-hidden overflow-y-auto overscroll-none m-0 p-0"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black overflow-x-hidden overflow-y-auto overscroll-none m-0 p-0`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
        {/* Fixed ThemeToggle in bottom right corner */}
        <div
          className="fixed z-50"
          style={{
            bottom: "calc(1rem + env(safe-area-inset-bottom))",
            right: "calc(1rem + env(safe-area-inset-right))",
          }}
        >
          <div className="p-1 sm:p-2">
            <ThemeToggleWrapper />
          </div>
        </div>
        {/* Shared Header component will be inside main so it scrolls with content */}
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}

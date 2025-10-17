# Arni Sanchez — Portfolio

A modern, responsive personal portfolio website built with Next.js, React, and Tailwind CSS. This project showcases Arni Sanchez's skills, projects, and contact information, and is designed for fast performance, accessibility, and easy deployment.

## Features

- **Home:** Eye-catching animated introduction and personal branding.
- **About:** Brief biography and background information.
- **Projects:** Dynamic list of featured projects, with descriptions and links.
- **Contact:** Accessible contact form powered by Formspree, with server/client validation and user feedback.
- **Header Navigation:** Fixed, animated header with smooth scrolling and route navigation.
- **Dark/Light Theme:** Toggleable theme with smooth transitions and system preference support.
- **Responsive Design:** Fully mobile-friendly and works on all screen sizes.
- **Accessibility:** Semantic HTML, focus states, and ARIA best practices.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, SSR/SSG, API routes)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Formspree](https://formspree.io/) (for contact form)
- [Vercel](https://vercel.com/) (for deployment)

## Getting Started

Install and run locally:

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build for production locally:

```bash
npm run build
npm run start
```

## Deployment

This project is ready for Vercel (or any Node.js host):

1. Push your repository to GitHub (or GitLab/Bitbucket).
2. Create a new project on Vercel and connect the repo.
3. Vercel will detect Next.js and use the `npm run build` command automatically. Ensure the project uses Node >= 18.
4. The repo already contains `vercel.json` which sets NEXT_TELEMETRY_DISABLED during builds.

## Contact Form Configuration

To enable the contact form, set the public Formspree form ID in your environment:

- **Local (temporary):**

  ```bash
  export NEXT_PUBLIC_FORMSPREE_FORM_ID="f/yourFormId"
  npm run dev
  ```

- **Local (recommended):** Create a `.env.local` file in the project root:

  ```env
  NEXT_PUBLIC_FORMSPREE_FORM_ID=f/yourFormId
  ```

  Restart the dev server after editing `.env.local`.

- **Production (Vercel):** Set the environment variable in your Vercel dashboard (Project Settings → Environment Variables).

If the variable is not set, the UI will show a setup note with instructions.

## Testing & Linting

```bash
npm run test        # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run lint        # Run ESLint (Next lint)
```

## Project Structure

- `src/app/` — Main Next.js app directory (pages, layout, API routes)
- `src/components/` — Reusable UI components (Header, ThemeToggle, etc.)
- `src/data/` — Project data
- `src/hooks/` — Custom React hooks
- `public/` — Static assets

---

**Arni Sanchez Portfolio** — Built with ❤️ using Next.js, React, and Tailwind CSS.

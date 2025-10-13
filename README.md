Arni Sanchez — Portfolio

Quick start

Install and run locally:

```bash
# from repo root
npm install
npm run dev
# open http://localhost:3000
```

Build for production locally:

```bash
npm run build
npm run start
```

Deploying to Vercel

This project is a Next.js app and is ready for Vercel. Basic steps:

1. Push your repository to GitHub (or GitLab/Bitbucket).
2. Create a new project on Vercel and connect the repo.
3. Vercel will detect Next.js and use the `npm run build` command automatically. Ensure the project uses Node >= 18.
4. The repo already contains `vercel.json` which sets NEXT_TELEMETRY_DISABLED during builds.

## Contact form configuration & running tests

This project includes a contact form that can use Formspree. To enable the form in the browser you must provide a public Formspree form ID in `NEXT_PUBLIC_FORMSPREE_FORM_ID`.

- Local (zsh) temporary example:

```bash
# set in your shell for the current session
export NEXT_PUBLIC_FORMSPREE_FORM_ID="f/yourFormId"
# then start the dev server
npm run dev
```

- Recommended for local development: create a `.env.local` file in the project root (Next.js will pick this up automatically). Restart the dev server after editing `.env.local`.

```
# .env.local
NEXT_PUBLIC_FORMSPREE_FORM_ID=f/yourFormId
```

- Deployments (Vercel or other hosting): set the environment variable `NEXT_PUBLIC_FORMSPREE_FORM_ID` in your hosting dashboard (Vercel: Project Settings → Environment Variables). Use the value prefixed with `f/` as provided by Formspree.

Notes

- The client build reads `NEXT_PUBLIC_FORMSPREE_FORM_ID` when the app runs in the browser. The app also checks the server endpoint `/api/contact/config` at runtime to detect when a server-side Formspree configuration exists; this endpoint only reports presence (true/false) and does not expose the secret ID.
- If `NEXT_PUBLIC_FORMSPREE_FORM_ID` is not set and the server has no Formspree ID, the UI shows a friendly setup note explaining how to configure the variable.

Run tests & lint locally

```bash
# install deps
npm install

# run unit tests once
npm run test

# run tests in watch mode while developing
npm run test:watch

# run ESLint (Next lint)
npm run lint
```

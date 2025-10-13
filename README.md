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

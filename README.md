# Shivam Saini — Portfolio (Vue 3 + Vite)

Personal site for **Shivam Saini, Web Developer & Founder of Vistaar.ai**.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the built dist/
```

## Edit content

All text, links, skills, projects and services live in `src/data.js`.
Change them there; every section updates.

## Deploy to GitHub Pages

`vite.config.js` uses `base: "./"`, so the built `dist/` folder works from any
sub-path. Push the contents of `dist/` to the Pages branch (or the repo root
of a Pages repo).

## Sections (single page, founder-first)

1. **Hero** — "Every business deserves to be found online.", founder intro, and a
   looping Vistaar.ai product demo (prompt → build steps → site preview → live).
2. **Product** — the problem, Vistaar.ai as the answer (feature bento), how it works.
3. **Founder** — founder card, "Why I'm building Vistaar.ai" letter, journey timeline.
4. **Builder** — stats, tech stack, shipped projects, work-with-Shivam services.
5. **Early access** — form that opens WhatsApp with the message filled in, and an FAQ.

Vistaar.ai is presented as in development; there are no invented customers,
metrics or pricing. Edit the wording in `src/data.js`.

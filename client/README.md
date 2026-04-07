# CMS Client

React + TypeScript + Vite frontend for the CMS project.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Hook Form
- React Router
- Axios

## Tailwind Setup

Tailwind is enabled through the Vite plugin and loaded in [src/index.css](src/index.css).

- Vite plugin: [vite.config.ts](vite.config.ts)
- Tailwind entry import: [src/index.css](src/index.css)
- App style entry: [src/main.tsx](src/main.tsx)

The project uses two styling patterns:

- Utility classes directly in JSX (`className="..."`)
- Reusable component classes in `@layer components` with Tailwind `@apply`

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Styling Guidelines

- Prefer Tailwind utilities for one-off styling in components.
- Use `@layer components` + `@apply` in [src/index.css](src/index.css) for shared UI patterns (`cms-*` classes).
- Keep design tokens centralized via Tailwind `@theme` variables in [src/index.css](src/index.css).

# ProjectX Wash Website

Premium car detailing landing site for ProjectX Wash (Nicosia, Cyprus), built with Next.js App Router, React, TypeScript, and Tailwind CSS v4.

## Tech Stack

- Next.js 16 (`app/` router)
- React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` in `src/app/globals.css`)
- ESLint 9 + `eslint-config-next`

## Project Structure

```text
src/
	app/
		layout.tsx      # global layout, fonts, metadata, footer
		Header.tsx      # sticky responsive header + mobile menu
		page.tsx        # single-page sections (hero, process, services, etc.)
		globals.css     # global styles, animations, responsive behavior
public/
	cars/             # gallery and hero images
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run local development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run lint checks

## Content & Customization

Most editable content is centralized in `src/app/page.tsx` as arrays/constants:

- `PACKAGES` — RAW / ELITE / DIAMOND cards
- `PROCESS` — process strip steps
- `GALLERY` — image tiles
- `STATS` and `MARQUEE` — hero and motion text strips

Global branding/meta/footer/header lives in `src/app/layout.tsx` and `src/app/Header.tsx`.

## Styling Notes

- Tailwind utilities are used directly in components.
- Custom animations and interaction styles are in `src/app/globals.css`.
- Mobile behavior (touch targets, swipe strip, responsive spacing) is also handled in `globals.css`.

## Deployment

The app can be deployed to any Node-compatible host.

Typical flow:

```bash
npm install
npm run build
npm run start
```

For Vercel, import the repository and deploy with default Next.js settings.

## Troubleshooting

- If `npm run dev` fails, run:

  ```bash
  npm install
  npm run lint
  ```

- If styles look incorrect, ensure `src/app/globals.css` includes:

  ```css
  @import "tailwindcss";
  ```

## Brand Links

- Instagram: `https://www.instagram.com/projectx.wash.cy/`

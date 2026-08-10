# Vinayak Physician

A modern React.js web application for a physician clinic, built with Vite and Tailwind CSS.

## Tech Stack

- **React 19** — UI library
- **Vite 8** — Fast build tool and dev server
- **Tailwind CSS 4** — Utility-first CSS framework
- **Oxlint** — Fast linter

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Header.jsx
│   └── Footer.jsx
├── assets/         # Static assets (images, icons)
├── App.jsx         # Main application component
├── main.jsx        # Application entry point
└── index.css       # Global styles & Tailwind config
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`  | Run linter               |

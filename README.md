Nalla Matrix Portfolio

Overview
- A responsive, accessible, Matrix-themed portfolio with animated digital rain, a simulated terminal, filterable projects, code playground, and a contact form.

Quick start
1) Install & run: npm install && npm run dev
2) Open the dev URL printed in the console.

Editing your info
- Hero text, skills, projects, and code snippets live in src/data/data.js
- Contact email and GitHub link are in the bottom of the Contact section in the app (search for placeholder@example.com and github.com/placeholder)

Accessibility
- Skip link is included, keyboard focus styles are visible, terminal output uses aria-live, modals use role="dialog".

Tech
- React + Vite + Tailwind CSS
- Spline hero background + canvas Matrix rain (requestAnimationFrame)

Notes
- Press ? to open the terminal quickly.
- Hover over the binary text in the hero to decode the name.
- You can switch to a higher-contrast mode using the header toggle.

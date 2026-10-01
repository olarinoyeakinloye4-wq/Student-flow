# StudyFlow

StudyFlow is a responsive student study planner built with React, TypeScript, and Vite. Add coursework tasks, set due dates and priorities, and keep track of your progress in a clean dashboard. Tasks are stored locally in your browser.

## Features

- Create, complete, undo, and delete study tasks
- Track task counts, completion percentage, and tasks due today
- Filter the planner by all, pending, or completed tasks
- Highlight overdue tasks and identify task priority with readable labels
- Persist tasks across refreshes with localStorage
- Responsive layout with labeled form fields and keyboard focus styles

## Tech stack

- React 18 with TypeScript in strict mode
- Vite
- Plain CSS with custom properties
- Browser localStorage (no backend or account required)

## Setup

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

Create a production build in `dist/`:

```bash
npm run build
```

To serve that build locally for a final preview:

```bash
npm run preview
```

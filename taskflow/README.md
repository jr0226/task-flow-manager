# TaskFlow — Frontend Workspace

This directory contains the React 19 + Vite frontend application for **TaskFlow**. For the full project overview, features, roadmap, and architecture, refer to the [Root README](../README.md).

## Quick Start

```bash
# Navigate to the frontend directory
cd taskflow

# Install dependencies
npm ci

# Start the Vite development server
npm run dev
```

The application runs at `http://localhost:5173/`.

### Verification Commands

```bash
npm test         # Run unit tests via node:test
npm run lint     # Run ESLint checks
npm run build    # Build production bundle
npm run preview  # Preview production build
```

## Features

- Create, edit, delete with confirmation, complete and reopen tasks.
- Titles, descriptions, four statuses, four priorities, optional due dates and project names.
- Search across titles, descriptions and projects; combine status, priority, project and due-date filters.
- Sort by recent updates, creation time, deadline or priority.
- Dashboard totals, status distribution, completion percentage and overdue count calculated from real local tasks.
- Nearest open deadlines and project progress derived from task data.
- Light/dark appearance remembered in this browser.
- Responsive navigation, keyboard-accessible dialogs, Escape to cancel, form validation and empty states.
- JSON export in Settings.

Projects in this phase are groups of tasks sharing a project name. Independent project creation, editing and membership are later phases. Navigation intentionally includes only functioning Phase 1 views. No authentication or placeholder logout is displayed.

## Storage and errors

Tasks are stored under `taskflow.tasks.v1` in localStorage, and theme under `taskflow.theme`. No credentials are stored. A new workspace is empty: dashboard statistics are never invented.

Clearing browser site data removes the tasks. Export a JSON backup before switching browsers or clearing storage. JSON import is not implemented in this phase. Storage errors are shown, and unsuccessful writes never display success or silently update task state. Invalid saved data is preserved and editing is blocked until it is recovered or deliberately cleared outside the application.

### Browser Verification Checklist:

1. Create a task with a project, priority and a due date in the past. Confirm the summary and deadline list update.
2. Reload. The task should remain.
3. Edit its title, status and due date. Confirm the list reflects the changes.
4. Search by title or description. Combine filters and clear them.
5. Complete the task. It should stop being overdue and the completion percentage should update. Reopen it.
6. Open Projects and use View tasks to filter to that project.
7. Delete a task: Keep task cancels; Delete task removes it. Reload to verify removal.
8. Toggle dark mode and reload. Check the mobile navigation and task form at a narrow width.
9. Open Settings and export a JSON backup.

## Important files

| File | Purpose |
| --- | --- |
| `src/App.jsx` | Workspace navigation, task state, persistence, dashboard, task list, projects and settings |
| `src/components/TaskDialog.jsx` | Accessible create/edit form with validation |
| `src/components/Icon.jsx` | Small local SVG icon set without extra dependencies |
| `src/tasks.js` | Task validation, saved-data loading, filtering, dates, completion and summaries |
| `src/App.css` | Layout, components, light/dark themes and responsive breakpoints |
| `src/index.css` | Global defaults and keyboard focus styles |
| `tests/tasks.test.js` | Task behavior and storage error tests |
| `../.vscode/launch.json` | Chrome debug target |
| `../.vscode/tasks.json` | Starts Vite before debugging |

## Next phases

Keep this React project as the frontend and add a sibling `backend` directory for Java 21 + Spring Boot. Introduce REST APIs, PostgreSQL/Flyway persistence, secure authentication and per-user authorization incrementally. Replace local task persistence when server storage is available; do not silently fall back to local storage after failed API operations.

React Router, Axios, Lucide, Recharts and dnd-kit from the full project plan can be introduced with the phases that need them. Phase 1 uses React, CSS and local SVGs without adding dependencies. Kanban, calendar, team notifications, Docker/Nginx and Ubuntu deployment remain future work. This development server is for local use, not public production hosting.

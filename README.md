<div align="center">

# ⚡ TaskFlow

**A modern, responsive, local-first task and project management workspace.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tests](https://img.shields.io/badge/Tests-Node%20Runner%20Passing-brightgreen?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/jr0226/task-flow-manager/pulls)

<p align="center">
  <img src="taskflow/src/assets/hero.png" alt="TaskFlow Preview" width="680" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-testing--verification">Testing</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>

---

## 📌 Overview

**TaskFlow** (Task Flow Manager) is an elegant, high-performance personal task and project manager engineered for focus and clarity. Built with **React 19** and **Vite**, TaskFlow delivers zero-latency user interactions, a clean aesthetic with custom design tokens, dark/light theme switching, and local-first persistence with complete data ownership.

Designed with no heavy third-party UI framework dependencies, TaskFlow remains ultra-lightweight, snappy, and fully keyboard-accessible out of the box.

---

## ✨ Features

### 📊 Dynamic Dashboard & Real-Time Insights
- **Overview Metrics**: Total tasks, in-progress workloads, completed items, and overdue count updated dynamically.
- **Visual Progress Ring**: Live SVG-driven completion rate gauge.
- **Status Distribution**: Real-time breakdown across workflows.
- **Deadline Horizon**: Quick view of upcoming and nearest due dates.

### 📋 Task Lifecycle & Organization
- **Complete Task Management**: Create, edit, toggle completion, reopen, and delete tasks with confirmation dialogs.
- **Status Progression**: Standardized workflow across `To Do`, `In Progress`, `In Review`, and `Completed`.
- **Priority Tiers**: Color-coded priority tags (`Low`, `Medium`, `High`, `Urgent`).
- **Due Dates & Overdue Detection**: Smart timezone-aware local date evaluation that warns when deadlines are missed.

### 🔍 Search & Multi-Criteria Filtering
- **Instant Full-Text Search**: Query across titles, descriptions, and project names simultaneously.
- **Combined Filtering**: Mix and match filters by Status, Priority, Project, and Due Date (`Today` / `Overdue`).
- **Flexible Sorting**: Sort tasks by recently updated, creation date, deadline, or priority.

### 📁 Project-Based Grouping
- Group tasks automatically into dedicated project spaces.
- Calculate completion percentages and active task counts per project.
- Jump directly from project cards to filtered task views with one click.

### 🌓 Thoughtful User Experience & Design
- **Theme Support**: Seamless switching between **Light** and **Dark** modes, automatically saved to user preferences.
- **Accessibility (a11y)**: Semantic HTML5 dialogs, focus management, `Escape`-to-close modals, `aria-*` tags, and skip-to-content links.
- **Zero-Dependency Icons**: Lightweight, crisp inline SVG icon collection tailored for the app.

### 🛡️ Local-First & Data Privacy
- **Client-Side Persistence**: Tasks and theme preferences persist in `localStorage`.
- **Data Integrity & Protection**: Graceful error handling prevents accidental overwrites or corruption; malformed data triggers non-destructive recovery warnings.
- **JSON Backup Export**: One-click JSON backup export in Settings so you always own your data.

---

## 🛠 Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Modern Hooks (`useState`, `useEffect`, `useRef`), Functional Components |
| **Build Tool** | [Vite 6+](https://vitejs.dev/) | Lightning-fast HMR and optimized asset bundling |
| **Language** | [JavaScript (ESModules)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Clean, modern ES2023+ syntax |
| **Styling** | Vanilla CSS3 | Custom CSS variables, responsive design tokens, dark/light themes |
| **Testing** | Node.js Test Runner | Native `node:test` and `node:assert/strict` (zero external test runner dependencies) |
| **Code Quality** | [ESLint 9+](https://eslint.org/) | Strict React and Hooks linting rules |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jr0226/task-flow-manager.git
   cd task-flow-manager
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd taskflow
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or for clean reproducible installs:
   npm ci
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) to view TaskFlow.

---

## 📜 Available Scripts

Inside the `taskflow` directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm test` | Runs the automated unit and integration tests via Node's native test runner. |
| `npm run lint` | Analyzes code for stylistic errors and React hook rule violations. |
| `npm run build` | Bundles and minifies production-ready assets into the `dist/` folder. |
| `npm run preview` | Locally serves the production build from `dist/` to verify bundling. |

---

## 📂 Project Structure

```text
task-flow-manager/
├── .vscode/                     # VS Code launch and debug configurations
│   ├── launch.json              # Chrome debugging configuration
│   └── tasks.json               # Pre-launch task automation (starts Vite)
├── taskflow/                    # Frontend React application
│   ├── public/                  # Public static assets & favicon
│   ├── src/
│   │   ├── assets/              # Static branding and preview images
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Icon.jsx         # Lightweight SVG icon system
│   │   │   └── TaskDialog.jsx   # Accessible task creation & editing modal
│   │   ├── App.css              # Component styles, themes, and responsive layout
│   │   ├── App.jsx              # Application shell, state management & navigation
│   │   ├── index.css            # Base styles and reset rules
│   │   ├── main.jsx             # React DOM entry point
│   │   └── tasks.js             # Pure business logic: validation, filtering, storage
│   ├── tests/
│   │   └── tasks.test.js        # Unit and behavioral test suite
│   ├── eslint.config.js         # ESLint configuration
│   ├── index.html               # Main HTML template
│   ├── package.json             # NPM package scripts and dependencies
│   └── vite.config.js           # Vite build and plugin settings
└── README.md                    # Project documentation
```

---

## 🧪 Testing & Verification

TaskFlow utilizes Node's built-in test runner (`node:test`) for fast, zero-dependency test execution:

```bash
cd taskflow
npm test
```

### What the test suite covers:
- **Input Validation**: Rejection of empty titles, overlength strings, impossible calendar dates (e.g., February 30), and invalid statuses/priorities.
- **Overdue Calculations**: Local date boundary checks and exclusion of completed or undated tasks.
- **Immutable State Changes**: Verifying status transitions, completion timestamps, and non-mutative operations.
- **Search & Multi-Filtering**: Correct behavior when combining search queries, priority, project, and status filters.
- **Summary Metrics**: Accurate calculations for completion percentage, active project counts, and empty states.
- **Storage Safety**: Round-trip serialization, graceful error reporting on malformed JSON, and protection against overwriting corrupted existing data.

---

## 🗺 Roadmap

TaskFlow is developed in incremental stages:

- [x] **Phase 1: Local-First Workspace (Current)**
  - Fast React 19 SPA with Vite
  - Complete task CRUD with validation and confirmation
  - Rich multi-filter, search, and sorting
  - Dashboard analytics and project grouping
  - Dark/Light mode and JSON data export
  - Comprehensive unit test coverage

- [ ] **Phase 2: Cloud Backend & Multi-Device Sync**
  - Spring Boot (Java 21) REST backend
  - PostgreSQL database with Flyway schema migrations
  - Secure authentication (JWT / OAuth2) & per-user tenancy
  - Seamless migration from local storage to cloud storage

- [ ] **Phase 3: Advanced Productivity Views**
  - Interactive Kanban board with drag-and-drop (`dnd-kit`)
  - Calendar agenda view with deadline highlights
  - Team workspaces, activity feeds, and shared project boards

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve TaskFlow:

1. Fork the repository (`https://github.com/jr0226/task-flow-manager`).
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. Run tests and linting to ensure everything passes:
   ```bash
   npm test
   npm run lint
   ```
5. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify it for personal or commercial projects.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/jr0226">jr0226</a></sub>
</div>

# P12 Script Example: npm, Vite and Vue basics

Runnable examples for Meeting 12 (Build Tooling, npm, and SPA Framework). Every example has a comment at the top that says what it shows and how to run it.

## 1. What you need (once)

| Tool | Why | Check it |
|---|---|---|
| **Node.js LTS** (includes npm) from https://nodejs.org | runs npm and Vite | open a terminal and type `node -v` and `npm -v`. Both must print a version number (Vite 7 needs Node 20.19+ or 22.12+). |
| **VS Code** + the **Live Server** extension | opens the CDN examples through a small web server | VS Code > Extensions > search "Live Server" |
| A modern browser (Chrome, Edge, Firefox) | shows the pages | press F12 to open the Console |

If `node -v` says "command not found": install Node.js, then close and reopen the terminal.

## 2. The examples

| Folder | What it shows | Slide topic |
|---|---|---|
| `01-cdn-hello/` | Your first Vue app: `ref`, `{{ }}`, `@click`. No install. | Why a framework; template syntax |
| `02-cdn-directives/` | `v-bind`, `v-if`/`v-else`, `v-show`, `v-for` + `:key`, `v-model`, `computed`, `watch`, methods | v-for and v-if are map and filter; v-model |
| `03-cdn-components/` | A component with props (down), `emit` (up) and a slot | Arguments become props |
| `04-vite-profile-app/` | A real Vue + Vite project with four components, state, localStorage, build | The whole practicum: port a page to components, build it |
| `05-npm-basics/` | `package.json` scripts, dependencies vs devDependencies, semver, lockfile, `npm ci` | Ecosystem npm |

### How to open 01, 02, 03 (CDN examples)
- Easiest: double-click `index.html`. It needs internet once, to load Vue from the CDN.
- Recommended: in VS Code, open the folder, right-click `index.html`, choose **Open with Live Server**.

### How to run 04 (Vite project)
Open a terminal in the folder `04-vite-profile-app`. **Windows** (PowerShell or Command Prompt) and **macOS/Linux** (Terminal) use the same commands; only the path style differs.

```
# Windows example                       # macOS example
cd C:\Users\you\Documents\P12-Script-Example\04-vite-profile-app
                                        cd ~/Documents/P12-Script-Example/04-vite-profile-app

npm install        # downloads the packages into node_modules/ (needs internet, once)
npm run dev        # starts the development server
```
1. The terminal prints a line like `Local: http://localhost:5173/`. Open that address in the browser (or Ctrl+click it).
2. Edit a file in `src/` and save: the page updates by itself (hot reload).
3. Stop the server with **Ctrl+C** in the terminal.
4. Build for production:
```
npm run build      # creates the dist/ folder (compiled, minified, hashed file names)
npm run preview    # serves dist/ so you can try the REAL build, usually at http://localhost:4173/
```
Stop the preview with Ctrl+C. `dist/` and `node_modules/` are never committed (see `.gitignore`).

### How to run 05 (npm basics)
```
cd 05-npm-basics
npm install
npm start            # runs demo.js (script "start")
npm run semver       # shows what ^3.5.0, ~3.5.0, 3.5.0 and ^0.4.2 allow
npm run hello        # a one-line script
npm ci               # install EXACTLY what package-lock.json says (use it after a fresh clone)
```
Try this: delete `node_modules/`, run `npm ci`, and notice that the versions do not change.

## 3. Create your own Vite + Vue project from zero
```
mkdir worksheet-p12
cd worksheet-p12
npm create vite@latest . -- --template vue
npm install
npm run dev
```
The dot (`.`) means "create the project in this folder". Run it in an EMPTY folder. If a menu asks about existing files, choose **Cancel operation**, never "Remove existing files".

## 4. Common problems and fixes

| Message or symptom | Cause | Fix |
|---|---|---|
| `npm ERR! enoent ... package.json` / "Could not read package.json" | The terminal is in the wrong folder | `cd` into the folder that contains `package.json`, then run the command again (`dir` on Windows or `ls` on macOS shows the files) |
| `'npm' is not recognized` / `command not found: npm` | Node.js is not installed or the terminal was not restarted | Install Node.js LTS, reopen the terminal |
| `Port 5173 is already in use` | Another dev server is still running | Press Ctrl+C in the old terminal, or let Vite pick the next port (it prints the new address) |
| `You are using Node.js 18... Vite requires 20.19+` | Node is too old | Install the current LTS from nodejs.org |
| Blank page and `Failed to resolve import` in the Console | Misspelled file name or wrong letter case (`KartuProyek.vue` vs `kartuproyek.vue`) | Make the file name, the import and the tag spelling identical. Windows ignores case, Linux does not |
| `Cannot use import statement outside a module` (plain HTML + JS files) | The script tag has no `type="module"` | Use `<script type="module" src="...">`, and open the page through Live Server, not by double-click |
| `Vue is not defined` (CDN examples) | No internet, or the CDN script tag is missing/misplaced | Check the connection; the Vue `<script src=...>` must come BEFORE your own script |
| A `v-for` list works but behaves oddly after changes | Missing or non-unique `:key` | Add `:key` with a unique id |
| The page changes but nothing is saved after refresh | `localStorage` code only runs once | Use `watch` to save on every change (see `App.vue`) |
| Changed `package.json` but `npm ci` fails | The lockfile no longer matches | Run `npm install` to update the lockfile, then commit both files |

## 5. Version note
These examples were tested with Node.js 22, Vue 3.5, Vite 7 and `@vitejs/plugin-vue` 6. The CDN examples pin Vue to `3.5.13`, so they behave the same every time.

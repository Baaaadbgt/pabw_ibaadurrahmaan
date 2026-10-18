# PABW Meeting 8, 9 & 10 — Profile and Async API

## Files
- `profile.html`: HTML structure and form fields.
- `css/style_profil.css`: styling.
- `js/app.js`: P8 data/functions/array methods and P10 caller that handles the page states.
- `js/dom.js`: P9 DOM rendering, filter event delegation and form validation.
- `js/api.js`: the single API URL, fetch call, `response.ok`, JSON response parsing, and exported `fetchNews()`.

## Run
Open the folder in VS Code and use Live Server. Do not open using `file://`; ES modules and fetch should run through a local HTTP server. Use Chrome DevTools (F12), Console and Network.

## P10 data flow
`app.js` imports `fetchNews()` from `api.js`; only `api.js` calls `fetch()`. The API URL is declared once in `api.js`. `response.ok` is checked before reading the body. `response.json()` turns response JSON into a JavaScript value. The caller in `app.js` catches errors and shows them on the page.

API: `https://jsonplaceholder.typicode.com/posts?_limit=6` (public, no API key). Used keys: `userId` number, `id` number, `title` string, `body` string.

## Four states
- Loading: shown before the API response arrives.
- Success: post cards are shown.
- Failure: error message appears on the page; Try Again is available.
- Empty: run `renderNews([])` in DevTools Console after the page loads.

## JSON direction
`JSON.parse(text)` converts JSON text to a JavaScript value. `response.json()` reads/parses a fetch response body. `JSON.stringify(value)` converts a JavaScript value to JSON text.

## Screenshot tests for Sheet F
1. Success: online reload, capture the post cards.
2. Loading: DevTools > Network > Slow 3G, reload and capture while Loading is visible.
3. Failure: temporarily change URL in `js/api.js` to a nonexistent endpoint or set Network to Offline; capture error message, then restore URL/Online.
4. Empty: run `renderNews([])` in Console and capture the empty message.
5. Inspect the Network request headers/status and Elements panel. The URL is only in `api.js`; `fetch(` should appear only there.

## Hard cases (Sheet E)
- HTTP 404: `fetch` does not reject solely due to 404; `response.ok` is checked and a custom error is thrown.
- `await` outside async: invalid syntax; keep `await` inside `async function`.
- Non-JSON body: `Content-Type` is checked; a non-JSON response becomes a visible failure.
- Empty array: `renderNews([])` shows a clear empty-state message.

## AI disclosure — edit to reflect your actual work
Example: “I used AI to help draft and explain parts of this project. I tested and adapted the code. The parts I completed myself were: [state what you actually did]. AI assistance was used for: [state what was actually assisted].” Be truthful and make sure you can explain the code.

## Git
After each worksheet part, use `git add .`, `git commit -m "P10: ..."` and `git push`. Confirm the `worksheet-p10/` folder appears in your own GitHub repository.

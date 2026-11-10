// js/app.js -- PARTS B2, B3, B4. Loaded by index.html with type="module".
// Elements already present: #status, #cari (input), #ringkasan (p), #daftar (ul), #kosong (p, hidden).
//
// B2 (25) Show the data. Every item becomes <li class="kartu"> holding:
//          <h3> nama, <p> merek, <p> tarif formatted with formatTarif,
//          <p> "Available: N units" (or "Not available" when tersedia is 0).
//          Build it with createElement and textContent (NOT innerHTML). Empty #daftar first.
//          When no item is shown, show #kosong (remove the hidden attribute); otherwise hide it.
// B3 (20) Search and summary. When the user types in #cari (input event), show the result of cariNama(...).
//          Every time the list is drawn, #ringkasan holds "X items, Y units available"
//          computed with ringkasAlat from the items CURRENTLY shown.
// B4 (10) Status in #status: "Loading data..." before the data arrives, then cleared;
//          on failure: "Failed to load data: <error message>". The error must not reach the Console.

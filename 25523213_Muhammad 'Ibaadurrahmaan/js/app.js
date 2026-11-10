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
import  { ambilData } from "./api.js";
import { formatTarif, cariNama, ringkasAlat } from "./fungsi.js";

let currentData = []; 

async function showdata() {
    const kosong = document.getElementById("kosong");
    const daftar = document.getElementById("daftar");
    daftar.innerHTML = ""; 

    const item = await ambilData();
    
    item.forEach(alat => {
        const li = document.createElement("li");
        li.className = "kartu";
        const h3 = document.createElement("h3");
        h3.textContent = alat.nama;
        const pMerek = document.createElement("p");
        pMerek.textContent = alat.merek;
        const pTarif = document.createElement("p");
        pTarif.textContent = formatTarif(alat.tarif);
        const pTersedia = document.createElement("p");
        pTersedia.textContent = alat.tersedia > 0 ? `Available: ${alat.tersedia} units` : "Not available";
        li.appendChild(h3);
        li.appendChild(pMerek);
        li.appendChild(pTarif);
        li.appendChild(pTersedia);
        daftar.appendChild(li);
    });

    kosong.hidden = item.length > 0; // Show #kosong only when no items are shown
}

function searchAndSummarize(daftar) {
  const input = document.getElementById("cari");
  const ringkasan = document.getElementById("ringkasan");
  const daftarElem = document.getElementById("daftar");
  const kosongElem = document.getElementById("kosong");
}

function updateStatus(message) {
  const statusElem = document.getElementById("status");
  statusElem.textContent = message;
}

async function mulai() {
  updateStatus("Loading data...");
    try {
        const data = await showdata();
        updateStatus(""); // Clear status on success
        searchAndSummarize(data);
    }
    catch (error) {
        updateStatus(`Failed to load data: ${error.message}`);
    }
}

document.addEventListener("DOMContentLoaded", mulai);

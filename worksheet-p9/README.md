# PABW Meeting 8 + Meeting 9 — Synced Profile Project

## Tujuan
Project ini menyatukan P8 (JavaScript modern, data, fungsi murni, array methods) dan P9 (DOM, dynamic rendering, event delegation, form validation).

## Struktur berkas
- `profile.html`: struktur halaman dan field form. Data profil, skills, project cards, dan filter tidak ditulis satu per satu di HTML.
- `css/style_profil.css`: styling dan responsive layout.
- `js/app.js`: sumber data `profile`, `skills`, `projects`, `categories`; dua fungsi murni; `map()`, `filter()`, `find()`; console evidence P8.
- `js/dom.js`: import data, membangun elemen DOM, event delegation, validasi form.
- `README.md`: dokumentasi dan deklarasi AI.

## Menjalankan
1. Buka folder ini di VS Code.
2. Jalankan `profile.html` menggunakan Live Server.
3. Buka DevTools (F12) > Console.
4. Pastikan tidak ada error merah. `app.js` menggunakan `console.table()` untuk data P8.
5. Tes semua filter dan form P9.
Jangan membuka HTML dengan klik dua kali (`file://`) karena project menggunakan ES modules.

## Mengelola data
Edit `js/app.js`:
- `profile`: nama, peran, foto, bio, sosial media, dan lokasi.
- `skills`: daftar keahlian.
- `projects`: array of objects yang membentuk kartu proyek.
- `categories`: label dan nilai kategori filter.
Saat menambah proyek, pastikan nilai `category` cocok dengan salah satu `categories`.

## Kesesuaian P8
- `const` dan template literals.
- `??` dan `?.`.
- Dua fungsi murni: `createIntroduction()` dan `formatSkills()`.
- Array of objects serta `map()`, `filter()`, `find()`.
- Salinan array sebelum `sort()` agar data asli tidak berubah.
- `console.table()` untuk memeriksa data.

## Kesesuaian P9
- Selector DOM; `createElement()`, `textContent`, `append()`.
- Container dikosongkan pada awal `render()`.
- Satu listener pada parent filter; empty state.
- `preventDefault()`, validasi tiap field, error message, `aria-invalid`, dan tombol submit dinonaktifkan sampai form valid.

## AI disclosure — sesuaikan dengan proses sebenarnya
Contoh untuk diedit: “Saya menggunakan AI untuk membantu merancang struktur awal dan menjelaskan beberapa konsep. Saya meninjau, menguji, dan menyesuaikan kode. Bagian yang saya kerjakan sendiri: [tuliskan bagian nyata]. Bagian yang dibantu AI: [jelaskan bantuan nyata].”
Jangan menulis deklarasi yang tidak sesuai dengan prosesmu. Pastikan dapat menjelaskan kode yang dikumpulkan.

## Sebelum submit
- Selesaikan lembar A–F P8 dan P9, termasuk exit ticket dan self-assessment.
- Uji filter, klik berulang, empty state, dan form.
- Ambil screenshot Console sesuai worksheet.
- Buat beberapa commit dengan pesan yang menjelaskan perubahan, lalu push ke GitHub dan periksa repository.

// js/fungsi.js -- PART A. Three PURE functions (they depend only on their arguments and change nothing outside).
// All MUST be exported. Sample cases sit in uji-fungsi.html (open it through Live Server).

// A1
// formatTarif(angka) -> rupiah text with dots as the thousands separator, ending in "/day". The number 0 -> "Free".
//   formatTarif(15000) -> "Rp 15.000/day"      formatTarif(0) -> "Free"
export function formatTarif(angka) {
  if (angka === 0) {
    return "Free";
  }
  return `Rp ${angka.toLocaleString("id-ID")}/day`;
}

// A2
// cariNama(daftar, kata) -> a NEW ARRAY of the items whose nama CONTAINS kata (ignore upper/lower case).
//   Ignore spaces at the start/end of kata. An empty kata ("" or spaces only) -> a copy of the whole list (new array).
//   No match -> [].   The original array must NOT change.
export function cariNama(daftar, kata) {
  const kataTrimmed = kata.trim().toLowerCase();
  if (kataTrimmed === "") {
    return [...daftar];
  }
  return daftar.filter(item => item.nama.toLowerCase().includes(kataTrimmed));
}

// A3
// ringkasAlat(daftar) -> an OBJECT { total, unit, habis }:
//   total = number of items, unit = sum of every tersedia, habis = array of the nama of items whose tersedia is 0 (list order).
//   [{nama: "A", tersedia: 2}, {nama: "B", tersedia: 0}, {nama: "C", tersedia: 5}]
//     -> {total: 3, unit: 7, habis: ["B"]}
//   Empty list -> {total: 0, unit: 0, habis: []}.   Hint: reduce, filter, map.
export function ringkasAlat(daftar) {
  const total = daftar.length;
  const unit = daftar.reduce((sum, item) => sum + item.tersedia, 0);
  const habis = daftar.filter(item => item.tersedia === 0).map(item => item.nama);
  return { total, unit, habis };
}

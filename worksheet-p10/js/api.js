// P10: data layer. URL dan satu-satunya pemanggilan fetch() ada di file ini.
const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";

export async function fetchNews() {
  const response = await fetch(API_URL);

  // fetch() tidak otomatis gagal pada status 404/500.
  if (!response.ok) {
    throw new Error(`Permintaan API gagal (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("Respons API bukan JSON.");
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Isi respons tidak dapat dibaca sebagai JSON.");
  }

  if (!Array.isArray(data)) {
    throw new Error("Format data API tidak sesuai: seharusnya berupa array.");
  }

  return data;
}

// P10 data layer: URL and fetch call exist only in this file.
const URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";

export async function fetchNews() {
  try {
    const response = await fetch(URL);
    // fetch does not throw for HTTP 404/500, so check response.ok first.
    if (!response.ok) throw new Error("HTTP status " + response.status);

    const contentType = response.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      throw new Error("Response is not JSON. Content-Type: " + contentType);
    }
    return await response.json(); // response body -> JavaScript value
  } catch (error) {
    throw new Error("Could not load API data: " + error.message);
  }
}

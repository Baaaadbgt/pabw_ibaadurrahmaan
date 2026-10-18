import { fetchNews } from "./api.js";\n\n// PABW Meeting 8 + 9
// app.js berisi DATA dan pure functions. DOM diurus oleh dom.js.

// P8 B: const/let, template literal, ??, dan ?. 
export const profile = {
  name: "Muh Ibaad",
  role: "Computer Science Student · Web Development",
  photo: "https://via.placeholder.com/150",
  bio: "Hello! I am a Computer Science student interested in web development. I enjoy learning new technologies and turning ideas into functional and attractive web applications.",
  socialUrl: "https://www.instagram.com/muh.ibaad",
  socialLabel: "Visit my social media profile ↗",
  location: { city: "Yogyakarta" }
};

export const skills = ["HTML", "CSS", "JavaScript", "Data Science"];

// P8 D: array of objects. Tambah/edit/hapus data proyek di sini.
export const projects = [
  { id: 1, title: "Personal Profile Website", category: "web", year: 2026, completed: true, description: "A responsive profile page built with HTML, CSS, and JavaScript." },
  { id: 2, title: "Assignment Deadline Tracker", category: "web", year: 2026, completed: false, description: "A small idea for tracking assignments and their due dates." },
  { id: 3, title: "Data Visualization Practice", category: "data", year: 2026, completed: false, description: "Practice presenting data with charts and simple summaries." },
  { id: 4, title: "Student Data Exploration", category: "data", year: 2026, completed: false, description: "A learning project for exploring and understanding a dataset." },
  { id: 5, title: "Network Addressing Notes", category: "network", year: 2026, completed: true, description: "Practice notes about IP addressing and subnetting." }
];

export const categories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web Development" },
  { value: "data", label: "Data Science" },
  { value: "network", label: "Networking" }
];

// P8 C: pure function 1. ?. safely accesses optional nested data; ?? supplies fallback.
export function createIntroduction({ name = "Student", role = "Computer Science Student", location } = {}) {
  const city = location?.city ?? "Location not specified";
  return `${name} — ${role}. Based in ${city}.`;
}

// P8 C: pure function 2.
export const formatSkills = (skillList = []) => skillList.join(" · ");

// P8 D: map transforms each project into a label; filter selects completed projects; find returns one match.
export const projectLabels = projects.map(project => `${project.title} (${project.year})`);
export const completedProjects = projects.filter(project => project.completed === true);
export const featuredProject = projects.find(project => project.title === "Personal Profile Website");

// P9: pure function for category filtering.
export function getProjectsByCategory(projectList, category) {
  return projectList.filter(project => category === "all" || project.category === category);
}

// P8 E: sort a copy so the original array order is preserved.
export const projectsSortedByTitle = [...projects].sort((a, b) => a.title.localeCompare(b.title));

// Console evidence required by P8. Open DevTools > Console.
console.log("P8 — Introduction:", createIntroduction(profile));
console.log("P8 — Skills:", formatSkills(skills));
console.table(projects);
console.table(completedProjects);
console.log("P8 — Featured project:", featuredProject);
console.table(projectLabels.map(label => ({ label })));
console.log("P8 — Original order:", projects.map(project => project.title));
console.log("P8 — Sorted copy:", projectsSortedByTitle.map(project => project.title));


// P10 C: JSON.parse mengubah teks JSON menjadi nilai; JSON.stringify melakukan kebalikannya.
const sampleJsonText = '{"topic":"P10","status":"ready"}';
const sampleJsonValue = JSON.parse(sampleJsonText);
console.log("P10 — JSON.parse (text → value):", sampleJsonValue);
console.log("P10 — JSON.stringify (value → text):", JSON.stringify(sampleJsonValue));

/* P10: fungsi presentasi. Pengambilan data dilakukan melalui fungsi dari api.js. */
const newsContainer = document.querySelector("#news-list");
const newsStatus = document.querySelector("#news-status");
const newsRetryButton = document.querySelector("#news-retry");

function renderNews(posts) {
  newsContainer.replaceChildren();

  if (!Array.isArray(posts) || posts.length === 0) {
    newsStatus.textContent = "Belum ada post untuk ditampilkan.";
    newsStatus.dataset.state = "empty";
    newsRetryButton.hidden = false;
    return;
  }

  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
    const card = document.createElement("article");
    card.className = "news-card";

    const title = document.createElement("h3");
    title.textContent = typeof post.title === "string" && post.title.trim()
      ? post.title
      : "Post tanpa judul";

    const body = document.createElement("p");
    body.textContent = typeof post.body === "string" ? post.body : "";

    card.append(title, body);
    fragment.append(card);
  });

  newsContainer.append(fragment);
  newsStatus.textContent = `Berhasil memuat ${posts.length} post.`;
  newsStatus.dataset.state = "success";
  newsRetryButton.hidden = true;
}

async function loadNews() {
  newsRetryButton.hidden = true;
  newsContainer.replaceChildren();
  newsStatus.textContent = "Sedang memuat data dari API...";
  newsStatus.dataset.state = "loading";

  try {
    const posts = await fetchNews();
    renderNews(posts);
  } catch (error) {
    newsContainer.replaceChildren();
    newsStatus.textContent = `Gagal memuat data: ${error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui."}`;
    newsStatus.dataset.state = "failure";
    newsRetryButton.hidden = false;
  }
}

newsRetryButton.addEventListener("click", loadNews);

// Dibuka untuk menguji empty state dari DevTools Console: renderNews([])
window.renderNews = renderNews;
loadNews();

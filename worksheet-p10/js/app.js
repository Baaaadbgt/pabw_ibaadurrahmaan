// P8 data/pure functions + P10 caller. The network request is implemented in api.js.
import { fetchNews } from "./api.js";

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
export const projects = [
  {id:1,title:"Personal Profile Website",category:"web",year:2026,completed:true,description:"A responsive profile page built with HTML, CSS, and JavaScript."},
  {id:2,title:"Assignment Deadline Tracker",category:"web",year:2026,completed:false,description:"A small idea for tracking assignments and due dates."},
  {id:3,title:"Data Visualization Practice",category:"data",year:2026,completed:false,description:"Practice presenting data with charts and summaries."},
  {id:4,title:"Student Data Exploration",category:"data",year:2026,completed:false,description:"A learning project for exploring a dataset."},
  {id:5,title:"Network Addressing Notes",category:"network",year:2026,completed:true,description:"Practice notes about IP addressing and subnetting."}
];
export const categories = [
  {value:"all",label:"All"},{value:"web",label:"Web Development"},
  {value:"data",label:"Data Science"},{value:"network",label:"Networking"}
];

// P8 pure functions, optional chaining, nullish coalescing and template literal.
export function createIntroduction({name="Student",role="Computer Science Student",location}={}) {
  const city = location?.city ?? "Location not specified";
  return `${name} — ${role}. Based in ${city}.`;
}
export const formatSkills = list => list.join(" · ");
export const projectLabels = projects.map(p => `${p.title} (${p.year})`);
export const completedProjects = projects.filter(p => p.completed);
export const featuredProject = projects.find(p => p.title === "Personal Profile Website");
export const projectsSortedByTitle = [...projects].sort((a,b) => a.title.localeCompare(b.title));
export function getProjectsByCategory(list, category) {
  return list.filter(p => category === "all" || p.category === category);
}

// P10 Sheet C: JSON.parse is text -> value; JSON.stringify is value -> text.
const sampleText = '{"topic":"P10","active":true}';
const sampleValue = JSON.parse(sampleText);
const samplePayload = JSON.stringify(sampleValue);
console.log("JSON.parse:", sampleValue);
console.log("JSON.stringify:", samplePayload, typeof samplePayload);

// P8 console evidence.
console.log("Introduction:", createIntroduction(profile));
console.log("Skills:", formatSkills(skills));
console.table(projects);
console.table(completedProjects);
console.log("Featured project:", featuredProject);
console.table(projectLabels.map(label => ({label})));
console.log("Original order:", projects.map(p => p.title));
console.log("Sorted copy:", projectsSortedByTitle.map(p => p.title));

// P10 states and caller-level try/catch: error messages are shown on the page.
const status = document.querySelector("#news-status");
const errorBox = document.querySelector("#news-error");
const listBox = document.querySelector("#news-list");
const retry = document.querySelector("#retry-button");

function renderNews(posts) {
  listBox.textContent = "";
  errorBox.hidden = true;
  if (posts.length === 0) {
    status.textContent = "Empty: no posts were returned by the API.";
    retry.hidden = false;
    return;
  }
  posts.forEach(post => {
    const card = document.createElement("li");
    card.className = "card";
    const title = document.createElement("h3");
    title.textContent = post.title ?? "Untitled post";
    const body = document.createElement("p");
    body.textContent = post.body ?? "No description available.";
    const meta = document.createElement("small");
    meta.textContent = `Post ID: ${post.id ?? "?"} · User ID: ${post.userId ?? "?"}`;
    card.append(title, body, meta);
    listBox.append(card);
  });
  status.textContent = `Success: ${posts.length} posts loaded.`;
  retry.hidden = true;
}
// Worksheet E/F asks to test empty state from DevTools Console.
window.renderNews = renderNews;

export async function loadNews() {
  status.textContent = "Loading posts…";
  errorBox.hidden = true;
  retry.hidden = true;
  listBox.textContent = "";
  try {
    const data = await fetchNews();
    console.log("API response shape:", data);
    if (!Array.isArray(data)) throw new Error("Expected an array from the API.");
    renderNews(data);
  } catch (error) {
    status.textContent = "Failure: the posts could not be loaded.";
    errorBox.textContent = error.message || "Unknown error.";
    errorBox.hidden = false;
    retry.hidden = false;
  }
}
retry.addEventListener("click", loadNews);
loadNews();

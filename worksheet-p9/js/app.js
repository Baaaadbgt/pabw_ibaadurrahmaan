// DATA SOURCE: edit this file to manage the content shown on the page.
// app.js stores data and pure functions. DOM manipulation belongs in dom.js.

export const profile = {
    name: "Muh Ibaad",
    role: "Computer Science Student · Web Development",
    photo: "https://via.placeholder.com/150",
    bio: "Hello! I am a Computer Science student interested in web development. I enjoy learning new technologies and turning ideas into functional and attractive web applications.",
    socialUrl: "https://www.instagram.com/muh.ibaad",
    socialLabel: "Visit my social media profile ↗"
};

export const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Data Science"
];

// Add, edit, or remove project objects here.
// The page's project cards are generated from this array, not written one by one in HTML.
export const projects = [
    {
        id: 1,
        title: "Personal Profile Website",
        category: "web",
        description: "A responsive personal profile page built with HTML, CSS, and JavaScript."
    },
    {
        id: 2,
        title: "Assignment Deadline Tracker",
        category: "web",
        description: "A small idea for tracking assignments and their due dates."
    },
    {
        id: 3,
        title: "Data Visualization Practice",
        category: "data",
        description: "Practice presenting data with charts and simple summaries."
    },
    {
        id: 4,
        title: "Student Data Exploration",
        category: "data",
        description: "A learning project for exploring and understanding a dataset."
    },
    {
        id: 5,
        title: "Network Addressing Notes",
        category: "network",
        description: "A collection of practice notes about IP addressing and subnetting."
    }
];

export const categories = [
    { value: "all", label: "All" },
    { value: "web", label: "Web Development" },
    { value: "data", label: "Data Science" },
    { value: "network", label: "Networking" }
];

export function getProjectsByCategory(list, category) {
    return list.filter(
        (project) => category === "all" || project.category === category
    );
}

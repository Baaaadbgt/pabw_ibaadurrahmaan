// Data and pure functions: this file does not manipulate the DOM.
export const projects = [
    {
        title: "Personal Profile Website",
        category: "web",
        description: "A responsive personal profile page built with HTML, CSS, and JavaScript."
    },
    {
        title: "Assignment Deadline Tracker",
        category: "web",
        description: "A small idea for tracking assignments and their due dates."
    },
    {
        title: "Data Visualization Practice",
        category: "data",
        description: "Practice presenting data with charts and simple summaries."
    },
    {
        title: "Student Data Exploration",
        category: "data",
        description: "A learning project for exploring and understanding a dataset."
    },
    {
        title: "Network Addressing Notes",
        category: "network",
        description: "A collection of practice notes about IP addressing and subnetting."
    }
];

export function getProjectsByCategory(list, category) {
    return list.filter(
        (project) => category === "all" || project.category === category
    );
}

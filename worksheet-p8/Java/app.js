const profil = {
    name: "Muhammad Ibaadurrahmaan",
    role: "Computer Science Student",
    skills: [
        "HTML",
        "CSS",
        "JavaScript"
    ]
};

function buatPerkenalan({name, role}) {
    return  '${name} - ${role}.'; 
}

const skillsIssue = (daftar) => daftar.join(".");
skillsIssue(profil.skills);

const projectlist = [
    {
        name: "HealthHive",
        year: 2023,
        description: "UI UX design for a health and wellness app.",
        selesai: true
    },
    {
        name: "Stockin",
        year: 2024,
        description: "A java-based stock management application.",
        selesai: false
    }
];

const projectTitles = projectlist.map(
    (project) => project.name
);

const selesaiProjects = projectlist.filter(
    (project) => project.selesai
);

const catalogProjects = projectlist.find(
    (project) => project.name === "Stockin"
);

console.log(buatPerkenalan(profil));
console.log(skillsIssue(profil.skills));
console.log(projectTitles);
console.log(selesaiProjects);
console.log(catalogProjects);
console.table(projectlist);
console.table(profil.skills);


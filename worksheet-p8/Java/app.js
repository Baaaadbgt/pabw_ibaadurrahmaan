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
buatPerkenalan(profil);

const skillsIssue = (daftar) => daftar.join(".");
skillsIssue(profil.skills);


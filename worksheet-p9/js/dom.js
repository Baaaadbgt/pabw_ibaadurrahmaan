// DOM layer: reads data from app.js and renders it into HTML.
import { profile, skills, projects, categories, getProjectsByCategory } from "./app.js";

const profileRoot = document.querySelector("#profile-root");
const skillsRoot = document.querySelector("#skills-root");
const container = document.querySelector("#list");
const filterRow = document.querySelector("#filter");
const empty = document.querySelector("#empty");

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const submitButton = document.querySelector("#submit-button");
const successMessage = document.querySelector("#form-success");

// Render profile details from app.js data.
function renderProfile(data) {
    const top = document.createElement("div");
    top.className = "profile-top";

    const photo = document.createElement("img");
    photo.src = data.photo;
    photo.alt = "Foto profil";
    photo.className = "profile-photo";

    const details = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "HELLO, I'M";

    const title = document.createElement("h1");
    title.id = "profile-title";
    title.textContent = data.name;

    const role = document.createElement("p");
    role.className = "profile-subtitle";
    role.textContent = data.role;

    details.append(eyebrow, title, role);
    top.append(photo, details);

    const bio = document.createElement("p");
    bio.className = "bio";
    bio.textContent = data.bio;

    const social = document.createElement("a");
    social.className = "social-link";
    social.href = data.socialUrl;
    social.target = "_blank";
    social.rel = "noreferrer";
    social.textContent = data.socialLabel;

    profileRoot.replaceChildren(top, bio, social);
}

// Render skills from an array in app.js.
function renderSkills(list) {
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "WHAT I LEARN";

    const heading = document.createElement("h2");
    heading.id = "skills-heading";
    heading.textContent = "My Skills";

    const wrapper = document.createElement("div");
    wrapper.className = "skills-list";

    list.forEach((skill) => {
        const item = document.createElement("span");
        item.textContent = skill;
        wrapper.append(item);
    });

    skillsRoot.replaceChildren(eyebrow, heading, wrapper);
}

// Create the filter buttons from categories in app.js.
function renderFilterButtons(list) {
    filterRow.textContent = "";

    list.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "filter-button";
        button.dataset.category = category.value;
        button.textContent = category.label;

        if (category.value === "all") {
            button.classList.add("active");
        }

        filterRow.append(button);
    });
}

function buildCard(project) {
    const li = document.createElement("li");
    li.className = "card";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = project.category;

    li.append(title, description, category);
    return li;
}

// Required render pattern: clear first, check empty state, then build cards.
function render(list) {
    container.textContent = "";

    if (list.length === 0) {
        empty.hidden = false;
        return;
    }

    empty.hidden = true;
    list.forEach((project) => container.append(buildCard(project)));
}

// Event delegation: one click listener on the parent for every filter button.
filterRow.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !filterRow.contains(button)) return;

    const category = button.dataset.category;
    const selected = getProjectsByCategory(projects, category);

    filterRow.querySelectorAll("button").forEach((item) => {
        item.classList.toggle("active", item === button);
    });

    render(selected);
});

// Per-field validation.
const fields = [
    {
        input: nameInput,
        error: document.querySelector("#name-error"),
        validate: (value) => value.trim() !== "",
        message: "Nama tidak boleh kosong."
    },
    {
        input: emailInput,
        error: document.querySelector("#email-error"),
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        message: "Masukkan alamat email yang valid."
    },
    {
        input: messageInput,
        error: document.querySelector("#message-error"),
        validate: (value) => value.trim() !== "",
        message: "Pesan tidak boleh kosong."
    }
];

function validateField(field) {
    const valid = field.validate(field.input.value);
    field.error.textContent = valid ? "" : field.message;

    if (valid) {
        field.input.removeAttribute("aria-invalid");
    } else {
        field.input.setAttribute("aria-invalid", "true");
    }

    return valid;
}

function validateForm() {
    const results = fields.map(validateField);
    const valid = results.every(Boolean);
    submitButton.disabled = !valid;
    return valid;
}

fields.forEach((field) => {
    field.input.addEventListener("input", () => {
        validateField(field);
        validateForm();
        successMessage.hidden = true;
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
        const firstInvalid = fields.find(
            (field) => !field.validate(field.input.value)
        );
        if (firstInvalid) firstInvalid.input.focus();
        return;
    }

    successMessage.hidden = false;
    form.reset();

    fields.forEach((field) => {
        field.error.textContent = "";
        field.input.removeAttribute("aria-invalid");
    });

    submitButton.disabled = true;
});

// Initial render: all visible profile content and project cards come from app.js.
renderProfile(profile);
renderSkills(skills);
renderFilterButtons(categories);
render(projects);

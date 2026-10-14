// DOM interactions: this file selects elements and updates the page.
import { projects, getProjectsByCategory } from "./app.js";

const container = document.querySelector("#list");
const filterRow = document.querySelector("#filter");
const empty = document.querySelector("#empty");

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const submitButton = document.querySelector("#submit-button");
const successMessage = document.querySelector("#form-success");

// Build one project card safely from one data object.
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

// Clear first, then handle empty state, then render cards.
function render(list) {
    container.textContent = "";

    if (list.length === 0) {
        empty.hidden = false;
        return;
    }

    empty.hidden = true;
    list.forEach((project) => container.append(buildCard(project)));
}

// One listener on the parent handles all filter buttons.
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

// Initial page render.
render(projects);

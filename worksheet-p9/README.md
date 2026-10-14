# PABW Meeting 9 — Data-driven Profile Website

## Project overview
A personal profile website for practicing DOM selection, dynamic rendering, event delegation, and form validation.

## Source of the page content
The profile information, skills, project records, and filter categories are stored in `js/app.js`. `js/dom.js` imports those values and builds the corresponding page elements with DOM methods. The HTML contains structural containers and the form fields required by the worksheet; the individual profile text, skills, filter buttons, and project cards are not hard-coded there.

## Files
- `profile.html`: structural containers and form markup.
- `css/style_profil.css`: visual styling only.
- `js/app.js`: data and the category-filtering function.
- `js/dom.js`: selectors, dynamic rendering, event delegation, and form validation.

## Run
Open the folder in VS Code and serve `profile.html` using Live Server or another local server. Because the JavaScript uses ES modules, avoid opening the HTML directly as a `file://` URL. Check the browser Console for errors.

## Edit the displayed data
Open `js/app.js`:
- Update `profile` to change the name, role, photo, bio, and social link.
- Edit the `skills` array to change the skills list.
- Add, edit, or remove objects in `projects` to manage the project cards.
- Edit `categories` to manage the filter buttons. Ensure each project's `category` matches a category value.

## AI disclosure
Complete this section honestly based on your actual process. Example to adapt: “I used AI to help structure and explain parts of this project. I reviewed and tested the code and adapted it to my needs.” Do not claim work you did not do; make sure you can explain every submitted line.

## Submission checklist
- Test all category filters.
- Verify repeated clicks do not duplicate project cards.
- Test empty fields, whitespace-only input, invalid email, and valid form submission.
- Check that the Console has no errors.
- Complete worksheet Sheets A–F, attach the requested screenshots, and push the complete project to your GitHub repository.

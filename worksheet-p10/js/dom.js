// P9 DOM layer and form validation. API fetching is not performed here.
import {profile,skills,projects,categories,createIntroduction,formatSkills,getProjectsByCategory} from "./app.js";
const profileRoot=document.querySelector("#profile-root");
const skillsRoot=document.querySelector("#skills-root");
const projectContainer=document.querySelector("#list");
const filterRow=document.querySelector("#filter");
const emptyProjects=document.querySelector("#empty-projects");

function renderProfile(data){
  const top=document.createElement("div");top.className="profile-top";
  const photo=document.createElement("img");photo.src=data.photo;photo.alt=`Profile photo of ${data.name}`;photo.className="profile-photo";
  const details=document.createElement("div");
  const eyebrow=document.createElement("p");eyebrow.className="eyebrow";eyebrow.textContent="HELLO, I'M";
  const title=document.createElement("h1");title.textContent=data.name;
  const role=document.createElement("p");role.className="profile-subtitle";role.textContent=data.role;
  details.append(eyebrow,title,role);top.append(photo,details);
  const intro=document.createElement("p");intro.className="bio";intro.textContent=createIntroduction(data);
  const bio=document.createElement("p");bio.className="bio";bio.textContent=data.bio;
  const social=document.createElement("a");social.className="social";social.href=data.socialUrl;social.target="_blank";social.rel="noreferrer";social.textContent=data.socialLabel;
  profileRoot.replaceChildren(top,intro,bio,social);
}
function renderSkills(list){
  const heading=document.createElement("h2");heading.textContent="My Skills";
  const wrapper=document.createElement("div");wrapper.className="skills";
  list.map(skill=>{const span=document.createElement("span");span.textContent=skill;return span;}).forEach(el=>wrapper.append(el));
  const summary=document.createElement("p");summary.textContent=`Skills: ${formatSkills(list)}`;
  skillsRoot.replaceChildren(heading,wrapper,summary);
}
function renderFilters(list){
  filterRow.textContent="";
  list.forEach(c=>{const b=document.createElement("button");b.type="button";b.className="filter-button";b.dataset.category=c.value;b.textContent=c.label;if(c.value==="all")b.classList.add("active");filterRow.append(b);});
}
function buildProject(project){
  const card=document.createElement("li");card.className="card";
  const title=document.createElement("h3");title.textContent=project.title;
  const desc=document.createElement("p");desc.textContent=project.description;
  const tag=document.createElement("span");tag.className="tag";tag.textContent=project.category;
  const year=document.createElement("small");year.textContent=` · ${project.year}`;
  card.append(title,desc,tag,year);return card;
}
function renderProjects(list){
  projectContainer.textContent="";
  if(list.length===0){emptyProjects.hidden=false;return;}
  emptyProjects.hidden=true;list.forEach(p=>projectContainer.append(buildProject(p)));
}
filterRow.addEventListener("click",event=>{
  const button=event.target.closest("button");if(!button||!filterRow.contains(button))return;
  filterRow.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===button));
  renderProjects(getProjectsByCategory(projects,button.dataset.category));
});

// P9 form validation.
const form=document.querySelector("#contact-form");
const inputs=[
 {input:document.querySelector("#name"),error:document.querySelector("#name-error"),test:v=>v.trim()!=="",message:"Name is required."},
 {input:document.querySelector("#email"),error:document.querySelector("#email-error"),test:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),message:"Enter a valid email."},
 {input:document.querySelector("#message"),error:document.querySelector("#message-error"),test:v=>v.trim()!=="",message:"Message is required."}
];
const submit=document.querySelector("#submit-button"),success=document.querySelector("#form-success");
function validateField(f){const ok=f.test(f.input.value);f.error.textContent=ok?"":f.message;if(ok)f.input.removeAttribute("aria-invalid");else f.input.setAttribute("aria-invalid","true");return ok;}
function validateForm(){const ok=inputs.map(validateField).every(Boolean);submit.disabled=!ok;return ok;}
inputs.forEach(f=>f.input.addEventListener("input",()=>{validateField(f);validateForm();success.hidden=true;}));
form.addEventListener("submit",event=>{event.preventDefault();if(!validateForm()){const first=inputs.find(f=>!f.test(f.input.value));if(first)first.input.focus();return;}success.hidden=false;form.reset();inputs.forEach(f=>{f.error.textContent="";f.input.removeAttribute("aria-invalid");});submit.disabled=true;});

renderProfile(profile);renderSkills(skills);renderFilters(categories);renderProjects(projects);

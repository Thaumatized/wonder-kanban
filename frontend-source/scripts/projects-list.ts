import { Project } from "./utils/types";

export function renderProjectList(projects: Project[]) {
    const projectsList = document.getElementById('projects-list');

    if(!projectsList) { console.error('No projects list found'); return; };

    projectsList.innerHTML = "";
    projects.forEach(project => {
        projectsList.innerHTML += `
            <h2 class="project" onClick="js.selectProject(${project.id})">${project.name}</h2>
        `;
    });
}
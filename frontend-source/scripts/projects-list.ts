import { Project } from "./utils/types";

export function renderProjectList(projects: Project[], selected?: Project) {

    const projectsList = document.getElementById('project-list');

    projectsList!.innerHTML = "";
    projects.forEach(project => {
        projectsList!.innerHTML += `
            <h2 class="${project.id === selected?.id ? "project selected" : "project"}" onClick="js.selectProject(${project.id})">${project.name}</h2>
        `;
    });
}
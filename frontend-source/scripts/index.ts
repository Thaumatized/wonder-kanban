import { renderProjectList } from './projects-list';
import { renderTicketsList } from './tickets-list';
import { getProjects, getTickets } from './utils/data-access';
import { Project, Ticket } from './utils/types';

let projects: Project[] = [];
let selectedProject: Project | null = null;
let tickets: Ticket[] = [];

getProjects().then((newProjects: Project[]) => {
    projects = newProjects;
    renderProjectList(projects);
});

export function selectProject(projectId: number) {
    selectedProject = projects.find(project => project.id === projectId) || null;

    if(!selectedProject) { console.error(`No project found with id ${projectId}`); return; }

    getTickets(selectedProject.id).then((newTickets: Ticket[]) => {
        tickets = newTickets;
        renderTicketsList(selectedProject!, tickets);
    });
}

export function openTicket(ticketId: number) {
    const ticket = tickets.find(ticket => ticket.id === ticketId);

    if(!ticket) { console.error(`No ticket found with id ${ticketId}`); return; }

    alert(`Ticket opened: ${ticket.summary}`);
}
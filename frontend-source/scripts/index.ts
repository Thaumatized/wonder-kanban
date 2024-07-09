import { renderProjectList } from './projects-list';
import { renderTicketView, closeTicketView, readTicketFromView } from './ticket-view';
import { renderTicketList } from './ticket-list';
import { getProjects, getTickets, newProject, newTicket, updateTicket, validateLogin } from './utils/data-access';
import { Project, Ticket } from './utils/types';

let projects: Project[] = [];
let selectedProject: Project | undefined = undefined;
let tickets: Ticket[] = [];
let selectedTicket: Ticket | undefined = undefined;
let password: string = "";

getProjects().then((newProjects: Project[]) => {
    projects = newProjects;
    renderProjectList(projects, selectedProject);
});

export function selectProject(projectId: number) {
    selectedProject = projects.find(project => project.id === projectId) || undefined;

    if(!selectedProject) { console.error(`No project found with id ${projectId}`); return; }

    renderProjectList(projects, selectedProject);

    getTickets(selectedProject.id).then((newTickets: Ticket[]) => {
        tickets = newTickets;
        renderTicketList(selectedProject!, tickets, password != "");
    });
}

export function openTicket(ticketId: number) {
    const ticket = tickets.find(ticket => ticket.id === ticketId);

    if(!ticket) { console.error(`No ticket found with id ${ticketId}`); return; }

    selectedTicket = ticket;
    renderTicketView(selectedProject!, ticket, password != "");
}

export function closeTicket() 
{
    closeTicketView()
};

async function login() {
    const loginField = document.getElementById("login-field") as HTMLInputElement | undefined;
    const newPassword = loginField!.value;
    
    await validateLogin(newPassword).then((success: boolean) => {
        if(success) {
            password = newPassword;
            document.getElementById("login-button")!.innerText = "Logout";
            loginField!.style.display = "none";
            loginField!.value = "";
            document.getElementById("new-project-button")!.style.display = "block";
        } else {
            alert("Invalid password");
        }
    });
}

function logout() {
    password = "";
    document.getElementById("login-button")!.innerText = "Login";
    document.getElementById("login-field")!.style.display = "inline-block";
    document.getElementById("new-project-button")!.style.display = "none";
}

export function loginToggle() {
    async function  toggleLogin() {
        if(password) {
            logout();
        } else {
            await login();
        }
    } 

    toggleLogin().then(() => {
        if(selectedProject) {
            renderTicketList(selectedProject!, tickets, password != "");
        }
    });
}

export function createTicket()
{
    newTicket(selectedProject!.id, password).then(() => {
        getTickets(selectedProject!.id).then((newTickets: Ticket[]) => {
            tickets = newTickets;
            renderTicketList(selectedProject!, tickets, password != "");
        });
    });
} 

export function saveTicket() {
    const ticket: Ticket = {...selectedTicket!, ...readTicketFromView()};
    updateTicket(ticket, password).then(() => {
        getTickets(selectedProject!.id).then((newTickets: Ticket[]) => {
            tickets = newTickets;
            renderTicketList(selectedProject!, tickets, password != "");
            closeTicketView();
        });
    });
}

export function createProject() {
    const name = prompt("Enter the name of the new project");
    if(!name) { return; }
    const abbreviation = prompt("Enter the abbreviation of the new project");
    if(!abbreviation) { return; }

    const confirmation = confirm(`Confirm creation of project [${abbreviation}] ${name}`);

    if(confirmation && name && abbreviation && password) {
        newProject(name, abbreviation, password).then(() => {
            getProjects().then((newProjects: Project[]) => {
                projects = newProjects;
                renderProjectList(projects, selectedProject);
            });
        });
    }
}
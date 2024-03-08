import { renderProjectList } from './projects-list';
import { renderTicketView, closeTicketView } from './ticket-view';
import { renderTicketList } from './ticket-list';
import { getProjects, getTickets, newTicket, validateLogin } from './utils/data-access';
import { Project, Ticket } from './utils/types';

let projects: Project[] = [];
let selectedProject: Project | null = null;
let tickets: Ticket[] = [];
let password: string = "";

getProjects().then((newProjects: Project[]) => {
    projects = newProjects;
    renderProjectList(projects);
});

export function selectProject(projectId: number) {
    selectedProject = projects.find(project => project.id === projectId) || null;

    if(!selectedProject) { console.error(`No project found with id ${projectId}`); return; }

    getTickets(selectedProject.id).then((newTickets: Ticket[]) => {
        tickets = newTickets;
        renderTicketList(selectedProject!, tickets, password != "");
    });
}

export function openTicket(ticketId: number) {
    const ticket = tickets.find(ticket => ticket.id === ticketId);

    if(!ticket) { console.error(`No ticket found with id ${ticketId}`); return; }

    renderTicketView(selectedProject!, ticket);
}

export function closeTicket() 
{
    closeTicketView()
};

async function login() {
    const loginField = document.getElementById("login-field") as HTMLInputElement | null;
    const newPassword = loginField!.value;
    
    await validateLogin(newPassword).then((success: boolean) => {
        if(success) {
            password = newPassword;
            document.getElementById("login-button")!.innerText = "Logout";
            loginField!.style.display = "none";
            loginField!.value = "";
        } else {
            alert("Invalid password");
        }
    });
}

function logout() {
    password = "";
    document.getElementById("login-button")!.innerText = "Login";
    document.getElementById("login-field")!.style.display = "inline-block";
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
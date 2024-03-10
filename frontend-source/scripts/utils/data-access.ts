import { Project, Ticket} from './types';

export async function getProjects() : Promise<Project[]>{
    const response = await fetch('/api/getProjects.php');
    return response.json();
}

export async function getTickets(projectId: number) : Promise<Ticket[]>{
    const response = await fetch(`/api/getTickets.php?projectId=${projectId}`);
    return response.json();
}

async function post(url: string, data: any) : Promise<Response>{
    const response = await fetch(url, {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
}

export async function newTicket(projectId: number, password: string) : Promise<void>{
    const response = await post(`/api/createTicket.php`, {"password": password, "projectId": projectId});
}

export async function validateLogin(password: string) : Promise<boolean>{
    const response = await post(`/api/validatePassword.php`, {"password": password});
    return await response.text() === "true";
}

export async function updateTicket(ticket: Ticket, password: string) : Promise<void>{
    const response = await post(`/api/updateTicket.php`, {"password": password, "ticket": ticket});
    console.log(response.text());
}
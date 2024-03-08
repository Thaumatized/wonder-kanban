import { Project, Ticket} from './types';

export async function getProjects() : Promise<Project[]>{
    const response = await fetch('/api/getProjects.php');
    return response.json();
}

export async function getTickets(projectId: number) : Promise<Ticket[]>{
    const response = await fetch(`/api/getTickets.php?projectId=${projectId}`);
    return response.json();
}

export async function validateLogin(password: string) : Promise<boolean>{
    const response = await fetch(`/api/validatePassword.php`, {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"password": password}),
      });
      const txt = await response.text();
      console.warn(txt);
    return txt === "true";
}
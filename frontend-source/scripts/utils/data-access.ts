import { Project, Ticket} from './types';

export async function getProjects() : Promise<Project[]>{
    const response = await fetch('/api/getProjects.php');
    return response.json();
}

export async function getTickets(projectId: number) : Promise<Ticket[]>{
    const response = await fetch(`/api/getTickets.php?projectId=${projectId}`);
    return response.json();
}
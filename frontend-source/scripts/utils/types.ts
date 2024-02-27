export interface Project {
    id: number;
    name: string;
    abbreviation: string;
    statuses: Status[];
}

export interface Status {
    id: number;
    projectId: number;
    renderOrder: number;
    name: string;
}

export interface Ticket {
    id: number;
    projectId: number;
    internalId: string;
    summary: string;
    description: string;
    statusId: number;
}
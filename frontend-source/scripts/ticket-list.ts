import { Project, Ticket } from "./utils/types";

export function renderTicketList(project: Project, tickets: Ticket[]) {
    const ticketList = document.getElementById('ticket-list');

    ticketList!.innerHTML = "";
    ticketList!.style.gridTemplateColumns = `repeat(${project.statuses.length}, 1fr)`;

    project.statuses.forEach((status, index) => {
        ticketList!.innerHTML += `
            <h2 class="status" style="grid-column: ${index+1} / span 1; grid-row: 1 / span 1;">
                ${status.name}
            </h2>
        `;
    });

    const countInColumns = Array(project.statuses.length).fill(2);
    tickets.forEach(ticket => {
        const column = project.statuses.findIndex(status => status.id === ticket.statusId);
        ticketList!.innerHTML += `
            <div class="ticket" onClick="js.openTicket(${ticket.id})" style="grid-column: ${column+1} / span 1; grid-row: ${countInColumns[column]++} / span 1;">
                <h3>[${project.abbreviation}-${ticket.internalId}] ${ticket.summary}</h3>
            </div>
        `;
    });
}
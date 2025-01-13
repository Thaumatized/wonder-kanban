import { sanitizeStringForHTML } from "./utils/data-access";
import { Project, Ticket } from "./utils/types";

export function renderTicketList(project: Project, tickets: Ticket[], loggedIn: boolean) {
    const ticketList = document.getElementById('ticket-list');

    ticketList!.innerHTML = "";
    ticketList!.style.gridTemplateColumns = `repeat(${project.statuses.length}, 1fr)`;

    if(loggedIn) {
        ticketList!.innerHTML += `
        <button id="new-ticket-button" onClick="js.createTicket()" style="grid-column: 1 / span 1; grid-row: 1 / span 1;">
            new ticket
        </button>
        `;
    }

    const countInColumns = Array(project.statuses.length).fill(loggedIn ? 2 : 1);

    project.statuses.forEach((status, index) => {
        ticketList!.innerHTML += `
            <h2 class="status" style="grid-column: ${index+1} / span 1; grid-row: ${countInColumns[index]++} / span 1;">
                ${sanitizeStringForHTML(status.name)}
            </h2>
        `;
    });

    tickets.forEach(ticket => {
        const column = project.statuses.findIndex(status => status.id === ticket.statusId);
        ticketList!.innerHTML += `
            <div class="ticket" onClick="js.openTicket(${ticket.id})" style="grid-column: ${column+1} / span 1; grid-row: ${countInColumns[column]++} / span 1;">
                <h3>[${sanitizeStringForHTML(project.abbreviation)}-${ticket.internalId}] ${sanitizeStringForHTML(ticket.summary)}</h3>
            </div>
        `;
    });
}
import { Project, Ticket } from "./utils/types";

export function renderTicketsList(project: Project, tickets: Ticket[]) {
    const ticketsList = document.getElementById('ticket-list');

    if(!ticketsList) { console.error('No tickets list found'); return; };

    ticketsList.innerHTML = "";
    ticketsList.style.gridTemplateColumns = `repeat(${project.statuses.length}, 1fr)`;

    const countInColumns = Array(project.statuses.length).fill(1);
    tickets.forEach(ticket => {
        const column = project.statuses.findIndex(status => status.id === ticket.statusId);
        ticketsList.innerHTML += `
            <div class="ticket" onClick="js.selectTicket(${ticket.id})" style="grid-column: ${column+1} / span 1; grid-row: ${countInColumns[column]++} / span 1;">
                ${ticket.summary}
            </div>
        `;
    });
}
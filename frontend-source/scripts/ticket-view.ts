import { Project, Ticket } from "./utils/types";

export function renderTicketView(project: Project, ticket: Ticket) {
    const ticketView = document.getElementById('ticket-view');

    ticketView!.innerHTML = "";
    ticketView!.parentElement!.style.display = `block`;

    ticketView!.innerHTML += `
        <h2>
            [${project.abbreviation}-${ticket.internalId}] ${ticket.summary}
        </h2>
        <p class="status-text">
            ${project.statuses.find(status => status.id === ticket.statusId)?.name}
        <p>
        <p>
            ${ticket.description}
        </p>
    `;
}

export function closeTicketView() {
    const ticketView = document.getElementById('ticket-view');

    if(!ticketView) { console.error('No ticket view found'); return; };

    ticketView.parentElement!.style.display = `none`;
}
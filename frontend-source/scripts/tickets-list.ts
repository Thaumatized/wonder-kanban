import { Ticket } from "./utils/types";

export function renderTicketsList(tickets: Ticket[]) {
    const ticketsList = document.getElementById('tickets-list');

    if(!ticketsList) { console.error('No tickets list found'); return; };

    ticketsList.innerHTML = "";
    tickets.forEach(ticket => {
        ticketsList.innerHTML += `
            <p onClick="js.selectProject(${ticket.id})">${ticket.summary}</p>
        `;
    });
}
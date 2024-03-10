import { Project, Ticket } from "./utils/types";

export function renderTicketView(project: Project, ticket: Ticket, loggedIn: boolean) {
    const ticketView = document.getElementById('ticket-view');

    ticketView!.innerHTML = "";
    ticketView!.parentElement!.style.display = `block`;

    if(loggedIn) {
        ticketView!.innerHTML += `
            <div id="ticket-view-header-row">
                <h2>
                    [${project.abbreviation}-${ticket.internalId}]
                </h2>
                <input id="ticket-summary-field" type="text" placeholder="Summary"></input>
                <select id="ticket-status-field"></select>
            </div>
            <textarea id="ticket-description-field" rows="4" cols="50"  class="description"></textarea>
            <div id="ticket-view-footer-row">
                <button id="save-ticket-button" onClick="js.saveTicket(${ticket.id})">
                    Save
                </button>
                <button id="close-ticket-button" onClick="js.closeTicket()">
                    Close
                </button>
            </div>
        `;

        const summaryField = document.getElementById('ticket-summary-field') as HTMLInputElement;
        summaryField.value = ticket.summary;
        const descriptionField = document.getElementById('ticket-description-field') as HTMLTextAreaElement;
        descriptionField.value = ticket.description;
        const statusField = document.getElementById('ticket-status-field') as HTMLSelectElement;
        project.statuses.forEach(status => {
            statusField!.innerHTML += `
            <option value="${status.id}">
                ${status.name}
            </option>`
        });
        statusField.value = ticket.statusId.toString();
    }
    else
    {
        ticketView!.innerHTML += `
            <div id="ticket-view-header-row">
                <h2>
                    [${project.abbreviation}-${ticket.internalId}] ${ticket.summary}
                </h2>
                <p>
                    ${project.statuses.find(status => status.id === ticket.statusId)?.name}
                </p>
            </div>
            <p class="description">
                ${ticket.description}
            </p>
            <div id="ticket-view-footer-row">
                <button id="close-ticket-button" onClick="js.closeTicket()">
                    Close
                </button>
            </div>
        `;
    }
}

export function readTicketFromView() {
    const summaryField = document.getElementById('ticket-summary-field') as HTMLInputElement;
    const descriptionField = document.getElementById('ticket-description-field') as HTMLTextAreaElement;
    const statusField = document.getElementById('ticket-status-field') as HTMLSelectElement;

    return {
        summary: summaryField.value,
        description: descriptionField.value,
        statusId: parseInt(statusField.value)
    };
}

export function closeTicketView() {
    const ticketView = document.getElementById('ticket-view');

    if(!ticketView) { console.error('No ticket view found'); return; };

    ticketView.parentElement!.style.display = `none`;
}
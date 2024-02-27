import { getProjects, getTickets } from './utils/data-access';
import { Project, Ticket } from './utils/types';

getProjects().then((projects: Project[]) => console.log(projects)
);

getTickets(1).then((tickets: Ticket[]) => console.log(tickets)
);
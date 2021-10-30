import { Publisher, Subjects, TicketCreatedEvent } from '@wnlz/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

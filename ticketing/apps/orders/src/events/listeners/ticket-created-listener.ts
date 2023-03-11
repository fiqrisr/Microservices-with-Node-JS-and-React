import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@wnlz/common';

import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-groupt-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { title, price } = data;

    const ticket = Ticket.build({
      title,
      price
    });

    await ticket.save();

    msg.ack();
  }
}

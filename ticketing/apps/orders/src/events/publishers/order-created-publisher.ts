import { Publisher, OrderCreatedEvent, Subjects } from '@wnlz/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

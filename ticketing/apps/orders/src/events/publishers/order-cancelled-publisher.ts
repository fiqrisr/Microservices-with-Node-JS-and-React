import { Publisher, OrderCancelledEvent, Subjects } from '@wnlz/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

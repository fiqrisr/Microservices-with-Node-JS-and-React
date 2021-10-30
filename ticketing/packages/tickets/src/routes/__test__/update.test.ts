import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id is not exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', (global as NodeJS.Global & typeof globalThis).signin())
		.send({
			title: 'jofjewu',
			price: 30
		})
		.expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'jofjewu',
			price: 30
		})
		.expect(401);
});

it('returns a 401 if the user does not own the ticke', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', (global as NodeJS.Global & typeof globalThis).signin())
		.send({
			title: 'dasjf9u3r',
			price: 20
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', (global as NodeJS.Global & typeof globalThis).signin())
		.send({
			title: '9120u93difsa',
			price: 50
		})
		.expect(401);
});

it('returns a 400 if the user provided an invalid title or price', async () => {
	const cookie = (global as NodeJS.Global & typeof globalThis).signin();

	const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
		title: 'dasjf9u3r',
		price: 20
	});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 30
		})
		.expect(400);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'jfs9udas',
			price: -10
		})
		.expect(400);
});

it('updates the ticket provided with valid inputs', async () => {
	const cookie = (global as NodeJS.Global & typeof globalThis).signin();

	const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
		title: 'dasjf9u3r',
		price: 20
	});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'new title',
			price: 30
		})
		.expect(200);

	const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

	expect(ticketResponse.body.title).toEqual('new title');
	expect(ticketResponse.body.price).toEqual(30);
});

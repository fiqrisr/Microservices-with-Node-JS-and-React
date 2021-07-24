import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id is not exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', global.signin())
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

it('returns a 401 if the user does not own the ticke', async () => {});

it('returns a 400 if the user provided an invalid title or price', async () => {});

it('updates the ticket provided with valid inputs', async () => {});

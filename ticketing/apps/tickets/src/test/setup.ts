import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace,no-var
	var signin: () => string[];
}

jest.mock('../nats-wrapper');

let mongo: MongoMemoryServer;

beforeAll(async () => {
	process.env.JWT_KEY = 'djsafiewjov';

	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	collections.forEach(async collection => await collection.deleteMany({}));
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = () => {
	// Build a JWT payload. { id, email }
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'test@test.com'
	};

	// Create the JWT!
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build session object. { jwt: MY_JWT }
	const session = { jwt: token };

	// Turn that session into JSON
	const sessionJson = JSON.stringify(session);

	// Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJson).toString('base64');

	// Return a string thats the cookie with the encoded data
	return [`session=${base64}`];
};

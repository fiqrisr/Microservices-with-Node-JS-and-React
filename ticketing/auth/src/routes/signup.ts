import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@wnorg/common';

import { User } from '../models/user';

const router = express.Router();

router.post(
	'/api/users/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 32 })
			.withMessage('Password must be between 4 and 32')
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email in use');
		}

		const newUser = User.build({ email, password });
		await newUser.save();

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: newUser.id,
				email: newUser.email
			},
			process.env.JWT_KEY as string
		);

		// Store it on session object
		req.session = {
			jwt: userJwt
		};

		res.status(201).send(newUser);
	}
);

export { router as signupRouter };

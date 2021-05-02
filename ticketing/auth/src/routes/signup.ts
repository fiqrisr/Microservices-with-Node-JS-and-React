import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
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
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array());
		}

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
			'asdjfa'
		);

		// Store it on session object
		req.session = {
			jwt: userJwt
		};

		res.status(201).send(newUser);
	}
);

export { router as signupRouter };

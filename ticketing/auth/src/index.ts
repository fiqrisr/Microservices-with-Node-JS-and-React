import express from 'express';
import 'express-async-errors';

import { errorHandler } from './middlewares/error-handler';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { NotFoundError } from './errors/not-found';

const app = express();
app.use(express.json());

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', () => {
	throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => console.log('Listening on 3000'));

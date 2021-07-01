import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
import PageWrapper from '../../components/PageWrapper';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		body: { email, password },
		onSuccess: () => Router.push('/')
	});

	const onSubmit = async e => {
		e.preventDefault();

		doRequest();
	};

	return (
		<PageWrapper>
			<form onSubmit={onSubmit}>
				<h1>Sign In</h1>
				<div className="form-group">
					<label>Email Address</label>
					<input
						className="form-control"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						className="form-control"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				{errors}
				<button className="btn btn-primary">Sign In</button>
			</form>
		</PageWrapper>
	);
};

export default Signin;

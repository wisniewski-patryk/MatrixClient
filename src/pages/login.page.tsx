import React, { useState, type FormEvent } from 'react';
import MatrixService from '../services/matrix.service';

type LoginPageProperties = {
	onLogin: () => void;
}

type LoginForm = {
	login: string;
	password: string;
	server: string;
};

const LoginPage: React.FC<LoginPageProperties> = ({ onLogin }) => {
	const [form, setForm] = useState<LoginForm>({
		login: '',
		password: '',
		server: 'https://matrix.org'
	})

	const matrixService: MatrixService = MatrixService.getInstance();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		matrixService.setBaseUrl(form.server);
		matrixService.login(form.login, form.password)
			.then(() => {
				onLogin();
			})
			.catch(err => {
				console.error('Login failed:', err);
			});
	};

	return (
		<div className="container" style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
			<h2 className="mb-4">MatrixClient</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3 row align-items-center">
					<label htmlFor="login" className="col-sm-4 col-form-label text-end">Login</label>
					<div className="col-sm-8">
						<input
							id="login"
							name="login"
							type="text"
							value={form.login}
							onChange={handleChange}
							autoComplete="username"
							required
							className="form-control"
						/>
					</div>
				</div>
				<div className="mb-3 row align-items-center">
					<label htmlFor="password" className="col-sm-4 col-form-label text-end">Password</label>
					<div className="col-sm-8">
						<input
							id="password"
							name="password"
							type="password"
							value={form.password}
							onChange={handleChange}
							autoComplete="current-password"
							required
							className="form-control"
						/>
					</div>
				</div>
				<div className="mb-3 row align-items-center">
					<label htmlFor="server" className="col-sm-4 col-form-label text-end">Server Address</label>
					<div className="col-sm-8">
						<input
							id="server"
							name="server"
							type="text"
							value={form.server}
							onChange={handleChange}
							required
							className="form-control"
							style={{ width: '150%', maxWidth: 'none' }}
						/>
					</div>
				</div>
				<button type="submit" className="btn btn-primary w-100">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;

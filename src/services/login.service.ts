import ConfigService from './config.serivce';

interface LoginResponse {
	access_token: string;
	expires_in?: number;
	token_type?: string;
	scope?: string;
}

interface LoginCredentials {
	username: string;
	password: string;
	baseUrl: string;
}

class LoginService {
	private static instance: LoginService;

	private constructor() {}

	static getInstance(): LoginService {
		if (!LoginService.instance) {
			LoginService.instance = new LoginService();
		}
		return LoginService.instance;
	}

	async login(credentials: LoginCredentials): Promise<LoginResponse> {
		ConfigService.setBaseUrl(credentials.baseUrl);
		const path = "_matrix/client/v3/login";
		const response = await fetch(`${credentials.baseUrl}/${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: 'm.login.password',
				identifier: {
					type: 'm.id.user',
					user: credentials.username,
				},
				password: credentials.password,
				initial_device_display_name: 'MatrixClient Web App'
			})
		});

		if (!response.ok) {
			throw new Error(`Login failed: ${response.statusText}`);
		}

		return response.json() as Promise<LoginResponse>;
	}

	async logout(): Promise<void>{
		const url = localStorage.getItem('home_server');
		await fetch(`https://${url}/_matrix/client/v3/logout`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
			}
		});
	}
}

export default LoginService.getInstance();

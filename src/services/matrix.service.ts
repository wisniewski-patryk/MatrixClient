import {
	createClient,
	MatrixClient,
} from 'matrix-js-sdk';
import { LoginRequestType } from '../models/LoginRequestType';

class MatrixService {
	private static instance: MatrixService;
	private client: MatrixClient;

	private constructor() {
		this.client = createClient({baseUrl: 'https://matrix.org'});
	}

	public static getInstance(): MatrixService {
		if (!MatrixService.instance) {
			MatrixService.instance = new MatrixService();
		}
		return MatrixService.instance;
	}
	public setBaseUrl(url: string): void {
		this.client = createClient({baseUrl: url});
	}

	public async login(username: string, password: string): Promise<void> {
		const request = {
			type: LoginRequestType.password,
			user: username,
			password: password,
		};
		const response = await this.client.loginRequest(request);
		this.client.setAccessToken(response.access_token);
	}

	public async logout(): Promise<void> {
		await this.client.logout();
	}
	getString(): string {
		return JSON.stringify(this.client.baseUrl, null, 2);
	}
}

export default MatrixService;

type AppConfig = {
	apiUrl: string;
	token: string;
	[key: string]: unknown;
};

class ConfigService {
	private static instance: ConfigService;
	private config: AppConfig | null = null;

	private static baseUrl: string = '';

	private constructor() {}

	setBaseUrl(url: string): void {
		ConfigService.baseUrl = url;
	}

	getBaseUrl(): string {
		return ConfigService.baseUrl;
	}

	static getInstance(): ConfigService {
		if (!ConfigService.instance) {
			ConfigService.instance = new ConfigService();
		}
		return ConfigService.instance;
	}

	async loadConfig(): Promise<void> {
		const response = await fetch('/config.json');
		if (!response.ok) {
			throw new Error('Failed to load config.json');
		}
		this.config = (await response.json()) as AppConfig;
	}

	get<T extends keyof AppConfig>(key: T): AppConfig[T] {
		if (!this.config) {
			throw new Error('Config not loaded');
		}
		return this.config[key];
	}
}

export default ConfigService;

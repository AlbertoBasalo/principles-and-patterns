import * as fs from 'fs';
import * as path from "path";

export type Configuration = {
  port: number;
  host: string;
  repository: {
    server: string;
    database: string;
    user: string;
    password: string;
  };
  security: {
    secret: string;
    expiresIn: string;
  };
};

export class ConfigurationService {
  private static instance: ConfigurationService;
  public readonly configuration: Configuration | undefined;

  public constructor() {
    if (!ConfigurationService.instance) {
      this.configuration = this.load();
      ConfigurationService.instance = this;
    }
    return ConfigurationService.instance;
  }

  public static getInstance(): ConfigurationService {
    return ConfigurationService.instance;
  }

  private load() {
    const filePath = path.resolve(__dirname, './configuration.json');
    const fileContent = fs.readFileSync(filePath).toString();
    const configuration = JSON.parse(fileContent);
    return configuration;
  }
}

export class App {

  private configurationService = new ConfigurationService();

  constructor() {
  }

  public run() {
    console.log("App running...");
    console.log(this.configurationService.configuration);
    const repository = new Repository();
    repository.fetch();
  }
}

export class Repository {
  private configurationService = new ConfigurationService();

  constructor() {
  }

  public fetch() {
    console.log("Fetching data from repository");
    console.log(this.configurationService.configuration?.repository);
  }
}

new App().run();
new App().run();

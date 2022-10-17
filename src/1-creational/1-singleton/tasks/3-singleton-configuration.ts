// ! npm run 1-1-3
import * as fs from "fs";
import * as path from "path";
import { Configuration } from "./configuration.model";

// The service is now a singleton
export class ConfigurationService {
  private static instance: ConfigurationService;
  public readonly configuration!: Configuration; // aka payload
  // ! could be improved by using a getter returning a copy of the configuration

  constructor() {
    if (!ConfigurationService.instance) {
      this.configuration = this.load(); // aka getPayload()
      ConfigurationService.instance = this;
    }
    return ConfigurationService.instance;
  }

  public static getInstance(): ConfigurationService {
    return new ConfigurationService();
  }

  private load() {
    const filePath = path.resolve(__dirname, "./configuration.json");
    console.log("📖 Loading from: " + filePath);
    const fileContent = fs.readFileSync(filePath).toString();
    const configuration = JSON.parse(fileContent);
    return configuration;
  }
}
// * no more global vars

// high level class
export class App {
  // * dynamic access to payload
  private configuration = new ConfigurationService().configuration;

  public static main(): void {
    // * static access to payload
    const configuration = ConfigurationService.getInstance().configuration;
    console.log("🏠 App main static...");
    console.log(configuration);
  }

  public run() {
    console.log("👟  App running...");
    console.log(this.configuration);
    // * No more unneeded dependency params
    const repository = new Repository();
    repository.fetch();
  }
}

export class Repository {
  // * No more unneeded dependency params
  constructor() {}
  public fetch() {
    // * safe repetitive constructors calls
    const configurationService = new ConfigurationService();
    console.log("📦 Fetching data from repository");
    console.log(configurationService.configuration.repository);
  }
}

new App().run();
App.main();
new App().run();

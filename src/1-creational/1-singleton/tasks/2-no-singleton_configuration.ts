// ! npm run 1-1-2
import * as fs from "fs";
import * as path from "path";
import { Configuration } from "./configuration.model";

// A service that loads the configuration from a file
class ConfigurationService {
  public readonly configuration: Configuration;

  constructor() {
    this.configuration = this.load();
  }

  private load() {
    const filePath = path.resolve(__dirname, "./configuration.json");
    console.log("📖 Loading from: " + filePath);
    const fileContent = fs.readFileSync(filePath).toString();
    const configuration = JSON.parse(fileContent);
    return configuration;
  }
}
// ToDo: 🤢 used global variable
const configuration = new ConfigurationService().configuration;

// high level class
class App {
  // ToDo: 🤢 duplicated load and possible inconsistency
  private configurationService = new ConfigurationService();

  public static main(): void {
    console.log("🏠 App main static...");
    console.log(configuration); // using the global variable
  }

  public run() {
    console.log("👟  App running...");
    console.log(this.configurationService.configuration); // using the duplicated instance
    const repository = new Repository(this.configurationService.configuration); // passing the duplicated instance
    repository.fetch();
  }
}

// low level class
class Repository {
  // ToDo: 🤢 dependency hell
  constructor(private configuration: Configuration) {}
  public fetch() {
    console.log("📦 Fetching data from repository");
    console.log(this.configuration.repository);
  }
}

// main program
new App().run();
App.main();
new App().run();

import yaml from "js-yaml";
import fs from "fs";

const swaggerDocument = yaml.load(
  fs.readFileSync("./src/swagger.yaml", "utf8")
) as Record<string, any>;

export default swaggerDocument;

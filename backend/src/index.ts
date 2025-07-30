import "./initEnv";
import moduleAlias from "module-alias";
import app from "./app";
import { EXPRESS_PORT } from "./config/config";

if (process.env.NODE_ENV === "production") {
  moduleAlias.addAliases({
    "@utils": `${__dirname}/utils`,
    "@custom_types": `${__dirname}/../../types`,
  });
}

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});

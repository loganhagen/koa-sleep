import "./initEnv";
import moduleAlias from "module-alias";
import app from "./app";

if (process.env.NODE_ENV === "production") {
  moduleAlias.addAliases({
    "@utils": `${__dirname}/utils`,
    "@custom_types": `${__dirname}/../../types`,
  });
}

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
});

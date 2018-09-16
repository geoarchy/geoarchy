require("dotenv/config");
import * as next from "next";
import routes from "./routes";
import * as express from "express";

const app = next({ dev: process.env.NODE_ENV !== "production" });

const handler = routes.getRequestHandler(app);
// With express
app
  .prepare()
  .then(() => {
    express()
      .use(handler)
      .listen(3000);
  })
  .catch(err => require("fs").writeFileSync("./errors.json", err));

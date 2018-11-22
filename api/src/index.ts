import * as path from "path";

require("dotenv").config({
  path: path.join(__dirname, "../../.env")
});

import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { DataService } from "@geoarchy/data-service";

// import permissions from './resolvers/permissions'
import { checkJwt } from "./middleware";

const settings = {
  port: 8080,
  cors: {
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
};

const server = new GraphQLServer({
  resolvers,
  typeDefs: "./src/schema.graphql",
  // middlewares: [permissions],
  context: async req => {
    const db = new DataService();
    await db.init();
    return {
      ...req,
      db
    };
  }
});

server.express.post(
  server.options.endpoint,
  checkJwt,
  (err, req, res, next) => {
    if (err) {
      console.error("Token error: " + err);
      return res.status(401).send(err.message);
    }
    next();
  }
);

// server.express.post(server.options.endpoint, async (req, res, next) =>
//   getUser(req, res, next, db)
// );

server.start(settings, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);

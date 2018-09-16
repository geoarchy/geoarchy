import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { DataService } from "@geoarchy/data-service";

// import permissions from './resolvers/permissions'
import { checkJwt, getUser } from "./middleware";

let db = new DataService({});

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  // middlewares: [permissions],
  context: async req => {
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

server.express.post(server.options.endpoint, async (req, res, next) =>
  getUser(req, res, next, db)
);

const settings = {
  port: 8080
}
server.start(settings, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);

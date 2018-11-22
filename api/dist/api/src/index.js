"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../../.env")
});
const graphql_yoga_1 = require("graphql-yoga");
const resolvers_1 = require("./resolvers");
const data_service_1 = require("@geoarchy/data-service");
// import permissions from './resolvers/permissions'
const middleware_1 = require("./middleware");
const settings = {
    port: 8080,
    cors: {
        origin: "*",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
};
const server = new graphql_yoga_1.GraphQLServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: "./src/schema.graphql",
    // middlewares: [permissions],
    context: async (req) => {
        const db = new data_service_1.DataService();
        await db.init();
        return {
            ...req,
            db
        };
    }
});
server.express.post(server.options.endpoint, middleware_1.checkJwt, (err, req, res, next) => {
    if (err) {
        console.error("Token error: " + err);
        return res.status(401).send(err.message);
    }
    next();
});
// server.express.post(server.options.endpoint, async (req, res, next) =>
//   getUser(req, res, next, db)
// );
server.start(settings, ({ port }) => console.log(`Server is running on http://localhost:${port}`));
//# sourceMappingURL=index.js.map
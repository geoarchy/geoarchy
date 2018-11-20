## Setup

1. `yarn` in the root directory
2. install docker mongodb container, expose it on port 27017
3. `yarn dev` in the `api` directory to run the api
4. open `http://localhost:8080`
5. run the `/queries/example.graphql` in the API playground, following each step in the dropdown
6. Once this is complete, fetch the id from the last example query
7. In another terminal, open `web` directory and run `yarn dev`
8. Open `http://localhost:3000/map/{map_id_from_query}/edit`, et voila!

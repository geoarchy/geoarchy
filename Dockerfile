# Use a Node.js image and assign it as our build
FROM mhart/alpine-node:10 as build

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}
# Set the working directory, copy dependency management files to the working directory,
# and install the dependencies
WORKDIR /usr/src
RUN mkdir -p /usr/src/${SERVICE_NAME}
RUN apk add --update alpine-sdk python
COPY . /usr/src/
WORKDIR /usr/src/${SERVICE_NAME}
RUN yarn

# Copy all files to the working directly, build the application
# and purge the development dependencies
RUN yarn build

# Create a new image using a minimal Node.js image
# with no extra tools packaged in, such as Yarn or npm for the smallest final size
FROM mhart/alpine-node:base-11

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

# Set the working directory for the new image and
# set the `NODE_ENV` environment variable value to `production`
# along with setting the path for node_modules to be accessible
WORKDIR /usr/src/
ENV NODE_ENV="production"
ENV PATH="./node_modules/.bin:$PATH"
# Copy files from the base image over to our new image's working directory
COPY --from=build /usr/src/ .
WORKDIR /usr/src/${SERVICE_NAME}
RUN echo ${SERVICE_NAME}
COPY ${SERVICE_NAME}/docker-entrypoint.sh ./
# Start the server for Next.js using Node.js
CMD ["./docker-entrypoint.sh"]
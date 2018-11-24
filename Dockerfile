# Use a Node.js image and assign it as our build
FROM mhart/alpine-node:10

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}
ENV NODE_ENV="production"
ENV PATH="./node_modules/.bin:$PATH"

# Set the working directory, copy dependency management files to the working directory,
# and install the dependencies
WORKDIR /usr/src
RUN mkdir -p /usr/src/${SERVICE_NAME}
RUN apk add --update alpine-sdk python bash
COPY . /usr/src/
WORKDIR /usr/src/${SERVICE_NAME}
RUN yarn

# Copy all files to the working directly, build the application
# and purge the development dependencies
RUN yarn build

# Set the working directory for the new image and
# set the `NODE_ENV` environment variable value to `production`
# along with setting the path for node_modules to be accessible
# Copy files from the base image over to our new image's working directory
RUN echo ${SERVICE_NAME}
COPY ${SERVICE_NAME}/docker-entrypoint.sh /usr/src

# Start the server for Next.js using Node.js
ENTRYPOINT ["./usr/src/docker-entrypoint.sh"]
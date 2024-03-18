# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:19-alpine as build

#RUN mkdir /app
WORKDIR /build
# tsconfig is for typescript lang configuration, needed to describe how packages should run.
COPY ["package.json", "/build/"]
#COPY packages packages/

RUN npm install

# # copy the project files to app
COPY ./ /build/

# build the project
RUN npm run build-all


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /build/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
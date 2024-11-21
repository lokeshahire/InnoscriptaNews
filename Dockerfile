# Step 1: Use Node.js as the base image
FROM node:16 as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use Nginx to serve the built app
FROM nginx:1.21

# Step 8: Copy the build folder from the previous step to Nginx's public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow outside access
EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]

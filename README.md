# Node API Test

## Description

This Node.js API serves a Single Page Application (SPA) and offers comprehensive management of blog posts and tags. It encapsulates a range of functionalities, specifically tailored for creating, reading, updating, and deleting blog posts, alongside efficient handling of post comments and tags.

## Key Features

- Comprehensive Blog Post Management: Empowers users with full CRUD capabilities for blog posts.
- Effortless Listing of All Posts: Enables fetching a comprehensive list of all blog posts.
- Seamless Creation of New Posts: Facilitates the addition of new posts into the system.
- Convenient Retrieval of Posts by ID: Allows users to obtain specific posts using their unique ID.
- Streamlined Post Update Process: Offers the ability to modify existing posts efficiently.
- Simple Post Deletion Mechanism: Provides the functionality to remove posts from the system.
- Robust Comment Management: Supports retrieving comments associated with particular posts.
- Tag-Based Post Retrieval: Enables fetching posts linked to specific tags.

## API Endpoints

- GET /posts: Retrieves all posts.
- POST /posts: Adds a new post.
- GET /posts/{id}: Fetches a post by ID.
- PUT /posts/{id}: Updates a specific post by ID.
- DELETE /posts/{id}: Removes a post by ID.
- GET /posts/{id}/comments: Obtains comments for a given post.
- GET /tags/{name}: Retrieves posts associated with a particular tag.

## Technology Stack

- Node.js: The core platform for building the server-side of the application.
- Express: Used for creating the web server and handling API requests.
- Morgan: Implements logging functionality.
- Jest: Facilitates testing of the application.
- Installation and Setup Instructions
- Clone the repository and install dependencies:

## Installation and Setup

```bash

git clone https://github.com/YoussefAbdelrahman19/node_api_test.git
cd node-api-test
npm install
Running the API
Start the server: npm start
Run in development mode (with live reloading): npm run dev
Execute tests: npm test


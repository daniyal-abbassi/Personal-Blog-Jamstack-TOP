# Backend - JamStack Blog API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) 

This directory contains the Node.js and Express.js backend for the blog application. It serves a RESTful API for content management, user authentication, and data retrieval.

---

## Table of Contents

-   [Features](#features)
-   [API Endpoints](#api-endpoints)
-   [Database Schema](#database-schema)
-   [Setup and Usage](#setup-and-usage)

---

## Features

-   **RESTful API** for all blog operations.
-   **JWT-based authentication** for securing admin routes.
-   **Prisma ORM** for type-safe interaction with the PostgreSQL database.
-   **Image uploading** handled via Multer and Cloudinary.
-   **CORS** enabled for cross-origin requests from the frontends.



## API Endpoints

The following are the primary API routes available.

| Endpoint                       | Method   | Description                                     | Protected |
| ------------------------------ | -------- | ----------------------------------------------- | --------- |
| `/api/sign-up`                 | `POST`   | Registers a new user.                           | No        |
| `/api/log-in`                  | `POST`   | Authenticates a user and returns a JWT.         | No        |
| `/api/user`                    | `GET`    | Retrieves the authenticated user's data.        | Yes       |
| `/api/posts`                   | `GET`    | Fetches a list of all blog posts.               | No        |
| `/api/posts/post/:postId`      | `GET`    | Fetches a single blog post by its ID.           | No        |
| `/api/posts/create`            | `POST`   | Creates a new blog post.                        | Yes       |
| `/api/posts/edit/:postId`      | `PUT`    | Updates an existing blog post.                  | Yes       |
| `/api/posts/:postId`           | `DELETE` | Deletes a blog post.                            | Yes       |
| `/api/posts/:postId/comments`  | `GET`    | Fetches all comments for a specific post.       | No        |
| `/api/posts/:postId/comments/:commentId` | `DELETE` | Deletes a specific comment from a post.         | Yes        |
*(Note: Some endpoints are sill in develpment!)*


## Database Schema

The database schema is managed by Prisma and defined in `prisma/schema.prisma`. It includes the following models:

-   **User**: Stores user credentials and information.
-   **Post**: Contains all data for blog posts, including title, content, and publishing status.
-   **Tag**: Manages categories for posts.
-   **Comment**: Stores comments associated with posts.

## Setup and Usage

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Create a `.env` file in this directory and add your `DATABASE_URL`, `JWT_SECRET`, and Cloudinary keys.

3.  **Run Migrations:**
    ```bash
    npx prisma migrate dev
    ```

4.  **Start the Server:**
    ```bash
    node app.js
    ```
    The API will be running on `http://localhost:3001`.



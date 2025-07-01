# Public Client - Jamstack Blog

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

This directory contains the public-facing frontend for the blog project. It's a  React application built with Vite and designed with Material-UI to provide a clean and responsive user experience for readers.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## Features

-   **Post Discovery**: View a paginated list of all blog posts on the main page. 
-   **Single Post View**: Click on any post to read its full content on a dedicated page. 
-   **Content Filtering**: Filter posts by tags to easily find relevant articles.  
-   **Search Functionality**: Search for posts by title. 
-   **User Authentication**: Pages for user sign-in and sign-up. 
-   **Responsive Design**: A user-friendly layout that works across all devices, built with Material-UI.
-   **Theme Customization**: Light and dark mode support for comfortable reading. 

---

## Tech Stack

-   **Framework**: React (with Vite) 
-   **UI Library**: Material-UI 
-   **Routing**: React Router 
-   **Date Formatting**: `date-fns`  
-   **Security**: `DOMPurify` to sanitize HTML content from posts.

---

## Getting Started

1.  **Navigate to this Directory:**
    ```bash
    cd Frontend/public-client
    ```

2.  **Install Dependencies:**
    Make sure you have Node.js and npm/yarn installed.
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    Ensure the backend server is running first, as this client fetches data from it.
    ```bash
    npm run dev
    ```
    The application will be available at a local port, typically `http://localhost:5173`.

---

## Project Structure

A brief overview of the key directories inside `/src`:

-   **`/api`**: Contains all functions for making API calls to the backend (e.g., fetching posts, authentication).    
-   **`/components`**: Reusable React components used across various pages (e.g., `AppAppBar`, `Footer`).    -   **`/hooks`**: Custom React hooks for managing stateful logic, like fetching posts (`usePosts`).    
-   **`/pages`**: Top-level components that represent the different pages of the site (e.g., `Blog`, `PagePost`, `SignIn`). 
-   **`/shared-theme`**: Configuration and customization for the Material-UI theme.
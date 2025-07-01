# Frontend Applications

This directory contains the two separate React frontend applications for the Jamstack Blog project. Both applications are connect to the common backend API.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Table of Contents

-   [Application Overview](#application-overview)
-   [Shared Technologies](#shared-technologies)

---

## Application Overview

This project features a dual-frontend architecture, with each application serving a distinct purpose.

### 1. Public Client (`/public-client`)

This is the public-facing blog that visitors will see.

-   **UI Framework**: Material-UI
-   **Purpose**: Displaying published posts, reading articles, and viewing comments.
-   **README**: For more details, see the [public-client README](./public-client/README.md).

### 2. Private Client (`/private-client`)

This is the secure admin panel for managing the blog's content. Access is protected and requires authentication.

-   **UI Framework**: shadcn/ui
-   **Purpose**: Creating, editing, and deleting posts; managing users and comments.
-   **README**: For more details, see the [private-client README](./private-client/README.md).

---

## Shared Technologies

Both frontend applications are built upon a common foundation:

-   **React**: The core library for building the user interfaces.
-   **Vite**: A next-generation frontend tooling for fast development and optimized builds.
-   **React Router**: For handling client-side routing.

---



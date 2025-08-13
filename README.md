# Full-Stack JamStack Blog - TOP

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern blog platform built with Node.js/Express.js **backend** and React frontends, following **JamStack principles**. Features a RESTfull API, PostgreSQL database with Prisma ORM, JWT authentication, and two distinct frontends: an **admin panel** and a **public blog**.


![Posts](./screenshots/all-post-page.png)
---

## Table of Contents

-   [Project Structure](#project-structure)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
-   [Screenshots](#screenshots)
-   [Contributing](#contributing)

## Project Structure

```
.
├── backend/         # Node.js API, Prisma schema, etc.
└── frontend/
    ├── private-client/  # Admin Panel (shadcn/ui)
    └── public-client/   # Public Blog (Material-UI)
```

## Tech Stack

- **Backend**

  - Node.js
  - Express.js
  - Prisma
  - PostgreSQL
  - JWT
  - Cloudinary

- **Frontend**
  - React (Vite)
  - shadcn/ui (Admin)
  - Material-UI (Public)
  - React Router
  - Tailwind CSS (pre-built)

## Getting Started

Follow these steps to run the project locally.

**1. Prerequisites:**

- Node.js
- PostgreSQL
- `npm` or `yarn`

**2. Setup & Configuration:**

- Clone the repository: `git clone https://github.com/your-username/your-repo-name.git`
- Install dependencies in all three directories (`/backend`, `/frontend/public-client`, `/frontend/private-client`):

```bash
npm install
```

- In the `/backend` directory, create a `.env` file and provide your `DATABASE_URL` and `JWT_SECRET`.
- Run database migrations from the `/backend` directory:
  ```bash
  npx prisma migrate dev
  ```

**3. Run the Application:**

You will need three separate terminal windows to run the full application.

- **Backend Server** (from `/backend`):
  ```bash
  node app.js
  ```
- **Public Client** (from `/frontend/public-client`):
  ```bash
  npm run dev
  ```
- **Admin Panel** (from `/frontend/private-client`):
  ```bash
  npm run dev
  ```

---

## Screenshots

![Main Page/Dark](./screenshots/all-post-page.png)
![Main Page/Light](./screenshots/posts-page-llight.png)
![Latest Section](./screenshots/latest-posts-page.png)
![Admin Panel](./screenshots/admin-panel.png)
![Single Post](./screenshots/one-post-page.png)
![Sign-up/Sign-in](./screenshots/sign-up.png)

### Admin Panel
![Admin Panel GIF](./screenshots/admin-panel.gif)
---

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and open a pull request. For bugs and feature requests, please open an issue on the repository's "Issues" tab.

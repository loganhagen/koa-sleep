# Koa Sleep

An open-source web dashboard for viewing and analyzing your Fitbit sleep data. Built with Postgres, Express, React, Node.js, and TypeScript.

[Live Deployment](https://koasleep.dev)

## Development Setup

This section outlines the steps required to set up your local development environment for both the frontend and backend components.

### 1. Prerequisites

Ensure your system meets the following requirements:

* **Node.js:** `v20.0.0` or later.
    * _Recommendation:_ Use a Node.js version manager like [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) for easy switching between Node.js versions.
* **npm:** `v8.0.0` or later (usually bundled with Node.js).
* **Docker:** We use Docker Compose to manage a locally running `postgreSQL` server during development.

### 2. Getting the Code

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/loganhagen/koa-sleep.git
    cd koa-sleep
    ```

### 3. Environment Configuration

The application uses environment variables for configuration.

1.  **Create backend `.env` file:**
    * **`backend/.env` (example):**
        ```
        EXPRESS_PORT=5000
        DATABASE_URL="postgresql://admin:admin@localhost:5432/koa_sleep?schema=public"
        CORS_ALLOWED_ORIGINS=https://localhost:3000
        JWT_SECRET=yourjwtsecrethere
        BACKEND_URL=http://localhost:5000
        ```

2. **Create frontend `.env` file:**
    * **`frontend/.env` (example):**
        ```
        EXPRESS_URL=http://localhost:5000
        ```


### 4. Install Dependencies

Install the project's dependencies for each component.

1.  **Install Projec Dependencies:**
    ```bash
    npm i --prefix ./backend && npm i --prefix ./frontend # From repo root
    ```


### 5. Running Dev Servers

You will need three separate terminals for the full development environment:

1.  **Start PostgreSQL Docker container:**
    ```bash
    docker compose up --build # From repo root
    ```
2.  **Start the Backend Server (Express.js):**
    ```bash
    cd backend
    npm run dev
    ```

3.  **Start the Frontend Development Server (Next.js):**
    ```bash
    cd frontend
    npm run dev
    ```

### 6. Seed the Database

Follow the provided steps in the root of the backend directory.
1. **Apply migrations:**
    ```bash
    npx prisma migrate dev 
    ```

2. **Use the seed file:**
    ```bash
    npx prisma db seed
    ```

3. **Check database contents (optional):**
    ```bash
    npx prisma studio
    ```

## Versioning

### Front-End

1. Check-out a new branch (Ex. `chore/bump-version`).
2. Run `npm version patch --no-git-tag-version -m "chore: bump version to %s"`
3. Push to remote and create a PR.

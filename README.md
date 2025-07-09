# FitSync Dashboard

An open-source web dashboard for viewing FitBit data.

## Development Setup

This section outlines the steps required to set up your local development environment for both the frontend (client) and backend (server) components.

### 1. Prerequisites

Ensure your system meets the following requirements:

* **Node.js:** `v18.0.0` or later.
    * _Recommendation:_ Use a Node.js version manager like [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) for easy switching between Node.js versions.
* **npm:** `v8.0.0` or later (usually bundled with Node.js).
* **JSON Server (for mock API):** This tool is used to simulate the backend API during development.
    * _Recommendation:_ Install globally: `npm install -g json-server` (or locally if preferred, and run with `npx`).

### 2. Getting the Code

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/loganhagen/fitsync-dashboard.git
    cd fitsync-dashboard
    ```

### 3. Environment Configuration

The application uses environment variables for configuration.

1.  **Create server `.env` file:**
    * **`server/.env` (example):**
        ```
        JSON_SERVER_PORT=7000          # Port for the mock JSON server
        JSON_SERVER_ENDPOINT=sleep     # Endpoint for the mock API
        EXPRESS_PORT=5000              # Port for your Express.js backend
        ```
    **Important:** Do not commit your actual `.env` files. They are typically excluded by `.gitignore`.

### 4. Install Dependencies

Install the project's dependencies for each component.

1.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```
2.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```
3.  **Return to project root:**
    ```bash
    cd ..
    ```

### 5. Running Dev Servers

You will need three separate terminals for the full development experience:

1.  **Start the Mock API Server (JSON Server):**
    Open a new terminal and run:
    ```bash
    json-server path/to/your/sample-data.json --port 7000 # Use the port from JSON_SERVER_PORT in .env
    ```
    _This provides mock data for your Express backend._

2.  **Start the Backend Server (Express.js):**
    Open a **second** new terminal, navigate to the `server` directory, and run:
    ```bash
    cd server
    npm run dev
    ```

3.  **Start the Frontend Development Server (React):**
    Open a **third** new terminal, navigate to the `client` directory, and run:
    ```bash
    cd client
    npm start
    ```

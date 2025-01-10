# Backend Service with Node.js, Express, and PostgreSQL

This backend service is built using Node.js, ExpressJS, PostgreSQL, and TypeScript. It provides a set of CRUD functionalities for managing resources in a PostgreSQL database.

## Installation

### Set up environment variables

Configure environment variables: Create a `.env` file in the root directory and add the following configuration:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
DB_NAME=postgres
```

### Build and start the containers

```bash
docker-compose up --build
```

Access the service at [http://localhost:3000](http://localhost:3000).

### Database Migration

#### Generate Prisma Client

```bash
npx prisma generate
```

#### Run migrations

```bash
npx prisma migrate dev --name init
```

## Deployment

### Using Docker

1. Ensure that `docker` and `docker-compose` are installed on the deployment server.
2. Copy the project files to the server.
3. Set up the `.env` file with the appropriate production configuration.
4. Run the following command to build and start the application:
   ```bash
   docker-compose up --build -d
   ```
5. Verify the application is running by accessing the server's IP address or domain.

### Without Docker

1. Install Node.js and PostgreSQL on the server.
2. Copy the project files to the server.
3. Set up the `.env` file with the appropriate production configuration.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Build the project:
   ```bash
   npm run build
   ```
6. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### 1. Create a Resource

- **URL**: `/resources`
- **Method**: `POST`
- **Status Code**: `201`
- **Body**:

```json
{
  "name": "Name",
  "description": "Description"
}
```

- **Response**:

```json
{
  "id": 1,
  "name": "Name",
  "description": "Description",
  "created_at": "2025-01-10T12:00:00.000Z",
  "updated_at": "2025-01-10T12:00:00.000Z"
}
```

---

### 3. Get Resource Details

- **URL**: `/resources/{id}`
- **Method**: `GET`
- **Status Code**: `200`
- **Response**:

```json
{
  "id": 1,
  "name": "Name",
  "description": "Description",
  "created_at": "2025-01-10T12:00:00.000Z",
  "updated_at": "2025-01-10T12:00:00.000Z"
}
```

---

### 2. Get List of Resources

- **URL**: `/resources`
- **Method**: `GET`
- **Status Code**: `200`
- **Query Parameters** (optional):
  - `name`: Filter by resource name.
  - `limit`: Number of records to fetch.
  - `offset`: Pagination offset.
- **Response**:

```json
[
  {
    "id": 1,
    "name": "Name",
    "description": "Description 1",
    "created_at": "2025-01-10T12:00:00.000Z",
    "updated_at": "2025-01-10T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Name 2",
    "description": "Description 2",
    "created_at": "2025-01-10T12:00:00.000Z",
    "updated_at": "2025-01-10T12:00:00.000Z"
  }
]
```

---

### 4. Update a Resource

- **URL**: `/resources/{id}`
- **Method**: `PUT`
- **Status Code**: `200`
- **Body**:

```json
{
  "name": "Name",
  "description": "Description"
}
```

- **Response**:

```json
{
  "id": 1,
  "name": "Name",
  "description": "Description",
  "created_at": "2025-01-10T12:00:00.000Z",
  "updated_at": "2025-01-10T12:00:00.000Z"
}
```

---

### 5. Delete a Resource

- **URL**: `/resources/{id}`
- **Method**: `DELETE`
- **Status Code**: `200`
- **Response**:

```json
{
  "message": "Resource deleted successfully"
}
```

---

## Project Structure

```
├── src/
│   ├── controllers/
│   │   └── resource.ts
│   ├── models/
│   │   └── resource.ts
│   ├── routes/
│   │   └── resource.ts
│   ├── services/
│   │   └── resource.ts
│   └── app.ts
├── .env
├── tsconfig.json
├── package.json
├── Dcokerfile
├── docker-compose.yml
└── README.md
```

- **`controllers/`**: Contains logic for handling incoming HTTP requests.
- **`models/`**: Defines the structure of the database tables.
- **`routes/`**: Defines the API routes.
- **`services/`**: Contains business logic to interact with the database.
- **`app.ts`**: Initializes and configures the Express application.

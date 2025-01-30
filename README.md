
# Task Management API

This is a task management application that allows users to create, Get, update, delete, and filter tasks associated with specific projects. The application supports authentication using JWT tokens and utilizes **Prisma** ORM for interacting with a PostgreSQL database.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [API Routes](#api-routes)
5. [Database Schema](#database-schema)
6. [Testing API](#testing-api)
7. [Contributing](#contributing)
8. [License](#license)

---

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started)

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/WhatBytes
cd Backend
```

2. **Install dependencies:**

```bash
npm install or yarn install
```

3. **Set up the PostgreSQL database:**

# Prisma with PostgreSQL Setup

This section guides you through setting up **Prisma** with a **PostgreSQL** database, along with handling migrations.

## Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14 or above)
- **npm** or **yarn** (Package Manager)
- **PostgreSQL** installed and running

## 1. Install Dependencies

First, install Prisma CLI and the PostgreSQL client:

```bash
npm install prisma @prisma/client
```

This will install both the Prisma CLI and the client, which is necessary to interact with the database.

## 2. Initialize Prisma

In the root directory of your project, run the following command to initialize Prisma:

```bash
npx prisma init
```

This will generate the following files:
- `prisma/schema.prisma`: This is the main configuration file for Prisma, where you'll define your models and database connection.
- `.env`: The environment file where you'll store your database connection string.

## 3. Configure PostgreSQL Connection

Update the `.env` file to include your PostgreSQL database URL. The format for a PostgreSQL connection string is:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
```

For example:

```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydb?schema=public"
```

Make sure to replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your actual database credentials.

## 4. Define Your Data Model

Open the `prisma/schema.prisma` file, and define your data models. Here’s an example for a `User` model:

### Database Schema

The following **Prisma schema** describes the main models used in this API:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  projects  Project[]
  tasks     Task[]   @relation("AssignedTasks")
}

model Project {
  id        String   @id @default(uuid())
  name      String
  description String
  status    String
  createdAt DateTime @default(now())
  tasks     Task[]
  user      User @relation(fields: [userId], references: [id])
  userId    String
}

model Task {
  id            String   @id @default(uuid())
  title         String
  description   String
  status        String
  projectId     String
  assignedUserId String
  createdAt     DateTime @default(now())

  project       Project @relation(fields: [projectId], references: [id])
  assignedUser  User @relation("AssignedTasks", fields: [assignedUserId], references: [id])
}
```

### Relationships:
- A **User** can have many **Projects** and **Tasks**.
- A **Project** can have many **Tasks**.
- A **Task** is assigned to a **User**.

In this example:
- The `User` model has fields like `id`, `name`, `email`, `createdAt`, and `updatedAt`.
- Prisma uses `@id` to mark `id` as the primary key.
- The `@default(autoincrement())` attribute will auto-increment the `id` for each new user.
- And the same applies for remaining.

## 5. Run Migrations

Once the data model is defined, you'll need to create a migration to apply it to your database.

### Generate Migration

Run the following command to generate the migration:

```bash
npx prisma migrate dev --name init
```

This will create a new migration file in the `prisma/migrations` directory, and apply the migration to your database.

### Apply Migrations

After generating the migration, you can apply it to the database using:

```bash
npx prisma migrate deploy
```

This will apply all pending migrations to the PostgreSQL database.

## 6. Generate Prisma Client

After applying the migrations, generate the Prisma client using the following command:

```bash
npx prisma generate
```

This will generate the Prisma client, which you can use to interact with your PostgreSQL database in your Node.js code.

---

## 8. Checking the Database

To check if your tables are created and your migration was successful, you can connect to your PostgreSQL database using a tool like **pgAdmin** or **psql** and verify the schema.

---

### Summary

- Install Prisma and PostgreSQL dependencies.
- Configure your PostgreSQL connection in the `.env` file.
- Define models in `schema.prisma`.
- Run migrations to apply schema changes to the database.
- Generate Prisma Client and use it to interact with the database.


## Environment Variables

Create a `.env` file at the root of the project and add the following environment variables:

```env
# Database URL
DATABASE_URL="postgresql://your-username:your-password@localhost:5432/your-database"

# JWT Secret (for token signing)
JWT_SECRET="your-jwt-secret"

# Port
PORT = 5000
```

---

## API Routes

### Authentication Routes
- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login with credentials

### User Routes
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get a user by ID
- **PUT** `/api/users/:id` - Update an existing user
- **DELETE** `/api/users/:id` - Delete a user

### Project Routes
- **POST** `/api/projects` - Create a new project
- **GET** `/api/projects` - Get all projects
- **PUT** `/api/projects/:id` - Update an existing project
- **DELETE** `/api/projects/:id` - Delete a project

### Task Routes
- **POST** `/api/projects/:projectId/tasks` - Create a new task for a project
- **GET** `/api/projects/:projectId/tasks` - Get all tasks for a project
- **PUT** `/api/tasks/:id` - Update an existing task
- **DELETE** `/api/tasks/:id` - Delete a task
- **GET** `/api/tasks` - Filter tasks by status or assigned user

---

### Authentication Routes

- **POST** `/api/users/register`  
  **Description**: Register a new user  
  **Example Request**:
  ```json
  {
    "name": "Yoganand",
    "email": "yoga@example.com",
    "password": "password123"
  }
  ```
  **Example Response**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "Yoganand",
      "email": "yoga@example.com",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  }
  ```

- **POST** `/api/users/login`  
  **Description**: Login with credentials  
  **Example Request**:
  ```json
  {
    "email": "yoga@example.com",
    "password": "password123"
  }
  ```
  **Example Response**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "Yoganand",
      "email": "yoga@example.com"
    }
  }
  ```

---

### User Routes (Authorization Required)

- **GET** `/api/users`  
  **Description**: Get all users (Requires JWT)  
  **Example Request**:
  ```bash
  curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/users
  ```
  **Example Response**:
  ```json
  [
    {
      "id": "user_id1",
      "name": "Yoganand",
      "email": "yoga@example.com",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ]
  ```

---

### Project Routes (Authorization Required)

- **POST** `/api/projects`  
  **Description**: Create a new project (Requires JWT)  
  **Example Request**:
  ```json
  {
    "name": "Project Alpha",
    "description": "Description of Project Alpha",
    "status": "PLANNED"
  }
  ```
  **Example Response**:
  ```json
  {
    "id": "project_id1",
    "name": "Project Alpha",
    "description": "Description of Project Alpha",
    "status": "PLANNED",
    "createdAt": "2025-01-01T00:00:00Z"
  }
  ```

- **GET** `/api/projects`  
  **Description**: Get all projects (Requires JWT)  
  **Example Request**:
  ```bash
  curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/projects
  ```
  **Example Response**:
  ```json
  [
    {
      "id": "project_id1",
      "name": "Project Alpha",
      "description": "Description of Project Alpha",
      "status": "PLANNED",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
  ```

### Task Routes (Authorization Required)

- **POST** `/api/projects/:projectId/tasks`  
  **Description**: Create a new task for a project (Requires JWT)  
  **Example Request**: `/api/projects/project_id1/tasks`  
  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "status": "TODO",
    "assignedUserId": "user_id1"
  }
  ```
  **Example Response**:
  ```json
  {
    "id": "task_id1",
    "title": "New Task",
    "description": "Task description",
    "status": "TODO",
    "projectId": "project_id1",
    "assignedUserId": "user_id1",
    "createdAt": "2025-01-01T00:00:00Z"
  }
  ```

- **GET** `/api/projects/:projectId/tasks`  
  **Description**: Get all tasks for a project (Requires JWT)  
  **Example Request**: `/api/projects/project_id1/tasks`  
  **Example Response**:
  ```json
  [
    {
      "id": "task_id1",
      "title": "New Task",
      "description": "Task description",
      "status": "TODO",
      "projectId": "project_id1",
      "assignedUserId": "user_id1",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
  ```

- **GET** `/api/tasks`  
  **Description**: Filter tasks by status or assigned user (Requires JWT)  
  **Example Request**: `/api/tasks?status=TODO`  
  ```bash
  curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/tasks?status=TODO
  ```
  **Example Response**:
  ```json
  [
    {
      "id": "task_id1",
      "title": "New Task",
      "description": "Task description",
      "status": "TODO",
      "assignedUserId": "user_id1",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
  ```

---

## Testing API

I have tested All the APIs and given the postman collection in repository.

## Contributing

Feel free to fork the repository, make changes, and create pull requests. Here are a few guidelines for contributing:
1. Fork the repository and create a new branch.
2. Make your changes and add tests.
3. Submit a pull request with a clear description of the changes.

---

**End of README**

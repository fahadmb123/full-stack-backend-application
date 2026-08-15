# Presentation: Dual-Database User Management REST API

---

## Slide 1: Project Overview

### User Management REST API

* Built with **Node.js, Express.js, TypeScript, MySQL, and MongoDB**.
* Implements secure **CRUD operations** for user management.
* Uses **Repository Pattern and layered architecture**.
* Implements **JWT authentication** using HTTP-only cookies.
* Implements **Role-Based Authorization** for Admin and User.
* Uses **Zod validation and centralized error handling**.

---

## Slide 2: Backend Architecture

### Layered Architecture

```text
Client / Postman
       ↓
     Routes
       ↓
   Middleware
       ↓
  Controllers
       ↓
    Services
       ↓
Repository Interfaces
       ↓
Repository Implementations
       ↓
  ┌────┴─────┐
  ↓          ↓
MySQL     MongoDB
```

* **Routes:** Define API endpoints.
* **Middleware:** Authentication and role authorization.
* **Controllers:** Handle HTTP requests and responses.
* **Services:** Handle business logic.
* **Repositories:** Handle database operations.

---

## Slide 3: Dual-Database Syncing

### MySQL + MongoDB

* **MySQL** stores the primary user data.
* **MongoDB** stores the corresponding user data.
* The **Service Layer** coordinates operations between both repositories.
* The user ID is used to associate the corresponding records.

### Sync Flow

```text
Create User
     ↓
   Service
     ↓
 MySQL + MongoDB

Update User
     ↓
   Service
     ↓
 MySQL + MongoDB

Delete User
     ↓
   Service
     ↓
 MySQL + MongoDB
```

---

## Slide 4: Authentication & Role Security

### JWT Authentication

* User logs in with email and password.
* Password is verified using **bcrypt**.
* JWT is generated with the user's ID and role.
* JWT is stored in an **HTTP-only cookie**.
* `authMiddleware` verifies the token on protected routes.

### Authorization

* `roleMiddleware(["admin"])` protects admin-only routes.
* Normal users cannot access admin operations.

```text
Login
  ↓
Generate JWT
  ↓
HTTP-only Cookie
  ↓
authMiddleware
  ↓
roleMiddleware
  ↓
Protected Route
```

---

## Slide 5: API & Demo

### Main Endpoints

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/admin/users
GET    /api/admin/users/:id
POST   /api/admin/users
PATCH  /api/admin/users/:id
DELETE /api/admin/users/:id
```

### Demo Flow

1. Register a user.
2. Login and receive the JWT cookie.
3. Access a protected route.
4. Try an admin route as a normal user.
5. Login as admin.
6. Access the admin route successfully.
7. Perform CRUD operations.
8. Verify the changes in MySQL and MongoDB.

---

## Slide 6: Design & Implementation

### Repository Pattern

```text
Controller
    ↓
Service
    ↓
Repository Interface
    ↓
Repository Implementation
    ↓
Database
```

* Separates business logic from database logic.
* Supports **Single Responsibility Principle**.
* Uses repository abstractions to support **Dependency Inversion**.

### Additional Features

* **Zod** for request validation.
* **Centralized error middleware** for error handling.
* **Postman collection** for API testing.
* **API documentation** included with the project.

### Result

A structured backend with authentication, authorization, CRUD operations, and synchronized MySQL + MongoDB data.

**Thank You**

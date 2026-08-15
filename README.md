# Full Stack Backend Application

A scalable User Management REST API built using Node.js, Express.js, TypeScript, MySQL, MongoDB, JWT Authentication, and Role-Based Access Control (RBAC).

The project follows a layered architecture with the Repository Pattern, Service Layer, Dependency Injection, interface-based abstractions, centralized error handling, and request validation.

---

# 1. Project Overview

This project is a backend REST API designed to manage users with authentication, authorization, CRUD operations, and dual database handling.

The application uses both MySQL and MongoDB in the same project.

MySQL is used for the primary user data and relational operations, while MongoDB maintains a synchronized representation of the user data.

The application also implements:

- JWT Authentication
- HTTP-only Cookie Authentication
- Role-Based Authorization
- Admin and User routes
- CRUD operations
- Zod validation
- Centralized error handling
- Repository Pattern
- Service Layer
- Dependency Injection
- SOLID principles

---

# 2. Project Objectives

The main objectives of this project are:

- Build a RESTful backend API.
- Use Node.js with TypeScript.
- Implement CRUD operations.
- Use MySQL and MongoDB in the same application.
- Implement the Repository Pattern.
- Separate controllers, services, repositories, and routes.
- Implement JWT-based authentication.
- Store JWT authentication tokens in HTTP-only cookies.
- Implement role-based authorization.
- Protect routes using middleware.
- Synchronize user data between MySQL and MongoDB.
- Implement centralized error handling.
- Validate incoming requests using Zod.
- Follow SOLID principles.
- Use Dependency Injection.
- Maintain a clean and scalable project architecture.

---

# 3. Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Databases

- MySQL
- MongoDB

## Database Libraries

- mysql2
- Mongoose

## Authentication & Security

- JSON Web Token (JWT)
- bcrypt
- HTTP-only Cookies

## Validation

- Zod

## Development Tools

- Nodemon
- ts-node
- dotenv
- Postman
- Git
- GitHub

---

# 4. Architecture

The application follows a layered architecture.

```text
                         Client / Postman
                                |
                                v
                              Routes
                                |
                                v
                           Middleware
                         /             \
                        /               \
               Auth Middleware      Role Middleware
                        \               /
                         \             /
                                |
                                v
                           Controller
                                |
                                v
                             Service
                                |
                   -------------------------
                   |                       |
                   v                       v
            SQL Repository         Mongo Repository
                   |                       |
                   v                       v
                 MySQL                 MongoDB
# API Documentation

## Full Stack Backend Application

REST API documentation for the User Management Backend Application.

---

# 1. Base URL

```text
http://localhost:4000
```

---

# 2. Authentication

The application uses **JWT authentication with HTTP-only cookies**.

After successful login, the server creates a cookie:

```text
token
```

The cookie contains the JWT.

Protected requests require this cookie to be present.

The JWT contains:

```json
{
  "userId": 1,
  "role": "user"
}
```

---

# 3. Authentication Endpoints

## 3.1 Register User

Creates a new user.

### Request

```http
POST /api/auth/register
```

### Authentication

```text
Not required
```

### Request Body

```json
{
  "name": "Fahad",
  "email": "fahad@gmail.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

### Validation

The request is validated using Zod.

The following fields are validated:

* name
* email
* password
* confirmPassword

The password must satisfy the configured password requirements.

### Success Response

```json
{
  "success": true,
  "message": "Registered Successfully"
}
```

### Possible Errors

#### Validation Error

```http
422 Unprocessable Entity
```

Example:

```json
{
  "success": false,
  "errors": {
    "password": [
      "Password must be at least 6 characters"
    ]
  }
}
```

#### Duplicate Email

```http
409 Conflict
```

Example:

```json
{
  "success": false,
  "message": "User with email already exist"
}
```

---

# 4. Login

Authenticates an existing user and creates a JWT authentication cookie.

### Request

```http
POST /api/auth/login
```

### Authentication

```text
Not required
```

### Request Body

```json
{
  "email": "fahad@gmail.com",
  "password": "123456"
}
```

### Authentication Flow

```text
Login Request
     |
     v
Find User By Email
     |
     v
Compare Password
     |
     v
Generate JWT
     |
     v
Set HTTP-only Cookie
     |
     v
Login Successful
```

### Cookie

The server creates:

```text
token
```

The cookie is configured as an HTTP-only cookie.

### Success Response

```json
{
  "success": true,
  "message": "Logged In Successfully"
}
```

### Possible Errors

#### User Does Not Exist

```http
404 Not Found
```

#### Incorrect Password

```http
401 Unauthorized
```

---

# 5. Admin API

Admin endpoints require:

1. A valid JWT
2. The `admin` role

The request flow is:

```text
Request
   |
   v
Authentication Middleware
   |
   v
Role Middleware
   |
   v
Admin Controller
```

---

# 6. Get All Users

Returns all users.

### Request

```http
GET /api/admin/users
```

### Authentication

```text
Required
```

### Role

```text
admin
```

### Middleware

```text
authMiddleware
roleMiddleware(["admin"])
```

### Success

```http
200 OK
```

The response contains the users retrieved from the database.

---

# 7. Get User By ID

Returns a specific user.

### Request

```http
GET /api/admin/users/:id
```

### Example

```http
GET /api/admin/users/101
```

### Authentication

```text
Required
```

### Role

```text
admin
```

### URL Parameter

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | number | User ID     |

### Success

```http
200 OK
```

---

# 8. Create User

Allows an administrator to create a user.

### Request

```http
POST /api/admin/users
```

### Authentication

```text
Required
```

### Role

```text
admin
```

### Request Body

```json
{
  "name": "Suhail",
  "email": "suhail@gmail.com",
  "password": "123456"
}
```

### Processing

```text
Request
   |
   v
Validation
   |
   v
Admin Authorization
   |
   v
Hash Password
   |
   v
Create User in MySQL
   |
   v
Synchronize User with MongoDB
```

### Success

```http
201 Created
```

---

# 9. Update User

Updates one or more user fields.

The API uses `PATCH` because it supports partial updates.

### Request

```http
PATCH /api/admin/users/:id
```

### Example

```http
PATCH /api/admin/users/101
```

### Authentication

```text
Required
```

### Role

```text
admin
```

### Request Body

Only the fields that need to be changed should be sent.

Example:

```json
{
  "name": "Suhail"
}
```

Another example:

```json
{
  "email": "newemail@gmail.com"
}
```

Multiple fields can also be updated:

```json
{
  "name": "Suhail",
  "email": "suhail@gmail.com"
}
```

### Processing

```text
PATCH Request
      |
      v
Validate Data
      |
      v
Find Existing User
      |
      v
Check Duplicate Email
      |
      v
Hash Password If Password Changed
      |
      v
Update MySQL
      |
      v
Update MongoDB
```

### Success

```http
200 OK
```

---

# 10. Delete User

Deletes a user.

### Request

```http
DELETE /api/admin/users/:id
```

### Example

```http
DELETE /api/admin/users/101
```

### Authentication

```text
Required
```

### Role

```text
admin
```

### Processing

```text
Delete Request
      |
      v
Authentication
      |
      v
Admin Authorization
      |
      v
Delete From MySQL
      |
      v
Delete From MongoDB
```

### Success

```http
200 OK
```

---

# 11. Protected User Routes

User-specific routes require authentication.

Example:

```http
GET /api/user/products
```

### Authentication

```text
Required
```

The authentication middleware:

1. Reads the JWT from the `token` cookie.
2. Checks whether the token exists.
3. Verifies the JWT.
4. Rejects invalid or expired tokens.
5. Allows the request to continue.

---

# 12. Authentication Middleware

The authentication middleware protects private routes.

```text
Request
   |
   v
Read token cookie
   |
   v
Token exists?
   |
   ├── No → 401 Unauthorized
   |
   v
Verify JWT
   |
   ├── Invalid → 401 Unauthorized
   |
   v
Authenticated Request
```

### Missing Authentication

```http
401 Unauthorized
```

Example:

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Invalid or Expired Token

```http
401 Unauthorized
```

Example:

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

# 13. Role Middleware

Role middleware provides authorization after authentication.

Example:

```text
authMiddleware
      |
      v
roleMiddleware(["admin"])
      |
      v
Admin Controller
```

If a normal user attempts to access an admin-only route, access is denied.

### Forbidden Response

```http
403 Forbidden
```

Example:

```json
{
  "success": false,
  "message": "Access denied"
}
```

---

# 14. Error Handling

The application uses centralized error handling.

Errors are passed from controllers to the error middleware.

Example:

```text
Controller
    |
    v
Service
    |
    v
throw Error
    |
    v
next(error)
    |
    v
Error Middleware
    |
    v
HTTP Response
```

Example response:

```json
{
  "success": false,
  "message": "User not found"
}
```

---

# 15. HTTP Status Codes

| Status Code | Meaning                            |
| ----------- | ---------------------------------- |
| 200         | Request successful                 |
| 201         | Resource created                   |
| 400         | Bad request                        |
| 401         | Authentication required or invalid |
| 403         | Insufficient permissions           |
| 404         | Resource not found                 |
| 409         | Resource conflict                  |
| 422         | Validation error                   |
| 500         | Internal server error              |

---

# 16. Validation

The API uses Zod for request validation.

Validation is performed before invalid data reaches the business logic.

Example validation error:

```json
{
  "success": false,
  "errors": {
    "password": [
      "Password must be at least 6 characters"
    ],
    "confirmPassword": [
      "Invalid input: expected string, received undefined"
    ]
  }
}
```

---

# 17. Database Architecture

The project uses two databases:

```text
                 Backend Service
                      |
              ┌───────┴───────┐
              |               |
              v               v
            MySQL          MongoDB
```

MySQL is used for the primary relational user data.

MongoDB stores the synchronized user data.

The MySQL user ID is used to identify the corresponding MongoDB user.

Example:

```text
MySQL

id = 101

        ↓

MongoDB

userId = 101
```

---

# 18. Database Synchronization

## Create

```text
Create User
     |
     ├── MySQL
     |
     └── MongoDB
```

## Update

```text
Update User
     |
     ├── MySQL
     |
     └── MongoDB
```

## Delete

```text
Delete User
     |
     ├── MySQL
     |
     └── MongoDB
```

The service layer coordinates the repositories responsible for each database.

---

# 19. Architecture

The application follows a layered architecture.

```text
Routes
   |
   v
Middleware
   |
   v
Controllers
   |
   v
Services
   |
   v
Repository Interfaces
   |
   v
Repository Implementations
   |
   ├── MySQL
   |
   └── MongoDB
```

Responsibilities are separated between layers to improve maintainability, testability, and scalability.

---

# 20. Repository Pattern

The service layer communicates with repository abstractions instead of directly accessing the database.

```text
Service
   |
   v
IUserRepository
   |
   v
UserRepository
   |
   v
Database
```

The repository is responsible for database operations such as:

* Create
* Find
* Find by email
* Find by ID
* Update
* Delete

---

# 21. Testing With Postman

The API can be tested using the provided Postman collection.

The collection contains requests for:

```text
Authentication
    ├── Register
    └── Login

Admin
    ├── Get All Users
    ├── Get User By ID
    ├── Create User
    ├── Update User
    └── Delete User

User
    └── Protected Routes
```

After login, Postman stores the authentication cookie and sends it with subsequent protected requests.

---

# 22. Postman Collection

The exported Postman collection is available in:

```text
postman/
```

The collection can be imported into Postman to test the API.

---

# 23. Example Complete Flow

A complete application flow is:

```text
1. Register
      |
      v
2. User saved in MySQL
      |
      v
3. User synchronized with MongoDB
      |
      v
4. Login
      |
      v
5. JWT generated
      |
      v
6. JWT stored in HTTP-only cookie
      |
      v
7. Access protected route
      |
      v
8. Authentication middleware
      |
      v
9. Role middleware
      |
      v
10. Controller
      |
      v
11. Service
      |
      v
12. Repository
      |
      v
13. Database
```

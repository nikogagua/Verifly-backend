# Verifly-backend

Backend repository for Verifly project.

## Running the Project

1. Install dependencies

```bash
npm install
```

2. Create a .env file

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. Start the server

```bash
npm run dev
```

## Authentication API

### Register User

**POST** `/api/auth/signup`

Request Body:

```json
{
  "name": "name",
  "email": "email@gmail.com",
  "password": "123456"
}
```

Success Response:

```json
{
  "message": "User created successfully"
}
```

---

### Login User

**POST** `/api/auth/login`

Request Body:

```json
{
  "email": "niko@gmail.com",
  "password": "123456"
}
```

Success Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

### Protected Route Example

**GET** `/api/protected`

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Success response for going to protected route:

```json
{
  "message": "You are authorized",
  "user": {
    "userId": "...",
    "role": "explorer"
  }
}
```

## Authentication

The backend uses JWT authentication.

After login, the frontend must save the token and send it in the Authorization header for protected routes.

## Store API

### Create Store

**POST** `/api/store`

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Request Body:

```json
{
  "name": "Niko Store",
  "description": "Test store",
  "category": "Clothes",
  "phone": "555123456",
  "address": "Tbilisi"
}
```

Success Response:

```json
{
  "message": "Store created successfully",
  "store": {}
}
```

---

### Get All Stores

**GET** `/api/store`

Success Response:

```json
{
  "stores": []
}
```

---

### Get Current User Store

**GET** `/api/store/me`

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Success Response:

```json
{
  "store": {}
}
```

---

### Update Store

**PUT** `/api/store/me`

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Request Body:

```json
{
  "name": "Updated Store Name",
  "description": "Updated description"
}
```

Success Response:

```json
{
  "message": "Store updated successfully",
  "store": {}
}
```

---

### Delete Store

**DELETE** `/api/store/me`

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Success Response:

```json
{
  "message": "Store deleted successfully"
}
```

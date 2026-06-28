# Verifly-backend

Backend repository for the Verifly project.

---

# Running the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Start the server

```bash
npm run dev
```

---

# Authentication API

## Register User

**POST** `/api/auth/signup`

### Request Body

```json
{
  "name": "name",
  "email": "email@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "User created successfully"
}
```

---

## Login User

**POST** `/api/auth/login`

### Request Body

```json
{
  "email": "email@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

# Authentication

The backend uses JWT authentication.

After logging in, the frontend should save the JWT token and include it in the `Authorization` header using the Bearer scheme when accessing protected endpoints.

Example:

```text
Authorization: Bearer JWT_TOKEN
```

---

# Store API

## Create Store

**POST** `/api/store`

Authentication required.

### Request Body

```json
{
  "name": "Niko Store",
  "description": "Test store",
  "category": "Clothes",
  "phone": "555123456",
  "address": "Tbilisi"
}
```

### Success Response

```json
{
  "message": "Store created successfully",
  "store": {}
}
```

---

## Get All Stores

**GET** `/api/store`

No authentication required.

### Success Response

```json
{
  "stores": []
}
```

---

## Get Current User Store

**GET** `/api/store/me`

Authentication required.

### Success Response

```json
{
  "store": {}
}
```

---

## Update Store

**PUT** `/api/store/me`

Authentication required.

### Request Body

```json
{
  "name": "Updated Store Name",
  "description": "Updated description"
}
```

### Success Response

```json
{
  "message": "Store updated successfully",
  "store": {}
}
```

---

## Delete Store

**DELETE** `/api/store/me`

Authentication required.

### Success Response

```json
{
  "message": "Store deleted successfully"
}
```

---

# Product API

## Get All Products

**GET** `/api/products`

No authentication required.

### Success Response

```json
{
  "products": []
}
```

---

## Get Product

**GET** `/api/products/:productId`

No authentication required.

### Success Response

```json
{
  "product": {}
}
```

---

## Create Product

**POST** `/api/products/me`

Authentication required.

### Request Body

```json
{
  "name": "Nike Air Max",
  "description": "Running shoes",
  "price": 150,
  "images": [],
  "category": "Shoes",
  "stock": 15,
  "isActive": true
}
```

### Success Response

```json
{
  "message": "Product created successfully",
  "product": {}
}
```

---

## Get My Products

**GET** `/api/products/me`

Authentication required.

### Success Response

```json
{
  "products": []
}
```

---

## Get My Product

**GET** `/api/products/me/:productId`

Authentication required.

### Success Response

```json
{
  "product": {}
}
```

---

## Update Product

**PUT** `/api/products/me/:productId`

Authentication required.

### Request Body

```json
{
  "name": "Updated Product",
  "price": 200
}
```

### Success Response

```json
{
  "product": {}
}
```

---

## Delete Product

**DELETE** `/api/products/me/:productId`

Authentication required.

### Success Response

```json
{
  "message": "Product deleted successfully"
}
```

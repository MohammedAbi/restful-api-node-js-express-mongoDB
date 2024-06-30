# Product Inventory API

This is a Node.js application using Express and Mongoose to create a RESTful API for managing a product inventory.

## Features

- Create a new product
- Retrieve all products
- Retrieve a product by ID
- Update a product by ID
- Delete a product by ID

## Requirements

- Node.js
- MongoDB

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the Application

1. Start the server:

   ```bash
   npm start
   ```

2. The server will start on port 3000. You can access it at `http://localhost:3000`.

### API Endpoints

#### Get All Products

- **URL:** `/products`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    [
      {
        "_id": "60c72b1f4f1a2c001c8d4d1e",
        "name": "Product Name",
        "quantity": 10,
        "price": 100,
        "image": "http://example.com/image.jpg",
        "createdAt": "2021-06-14T10:33:51.831Z",
        "updatedAt": "2021-06-14T10:33:51.831Z",
        "__v": 0
      }
    ]
    ```

#### Get a Product by ID

- **URL:** `/products/:id`
- **Method:** `GET`
- **URL Params:** `id=[string]`
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "_id": "60c72b1f4f1a2c001c8d4d1e",
      "name": "Product Name",
      "quantity": 10,
      "price": 100,
      "image": "http://example.com/image.jpg",
      "createdAt": "2021-06-14T10:33:51.831Z",
      "updatedAt": "2021-06-14T10:33:51.831Z",
      "__v": 0
    }
    ```

#### Create a New Product

- **URL:** `/products`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "name": "Product Name",
    "quantity": 10,
    "price": 100,
    "image": "http://example.com/image.jpg"
  }
  ```

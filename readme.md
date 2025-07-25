# Course Selling Platform - Backend

![GitHub repo size](https://img.shields.io/github/repo-size/msdhundhiya/Course-selling-backend?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/msdhundhiya/Course-selling-backend?style=for-the-badge)


A robust backend server for a course-selling web application. This project provides a complete set of APIs to manage administrators, users, and courses, including authentication, course management, and purchasing logic.

## ✨ Key Features

- **Separate Admin and User Routes**: Secure and distinct API endpoints for administrators and users.
- **JWT Authentication**: Token-based authentication middleware to protect routes.
- **Full CRUD Functionality**: Create, Read, Update, and Delete operations for courses.
- **User-Specific Actions**: Allows users to view available courses and purchase them.
- **MongoDB Integration**: Uses Mongoose for elegant and straightforward database modeling and interaction with MongoDB.

---

## 🛠️ Tech Stack

This backend is built with modern and efficient technologies:

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: For securing API endpoints.
- **CORS**: To enable Cross-Origin Resource Sharing.
- **Nodemon**: For automatic server restarts during development.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/msdhundhiya/Course-selling-backend.git](https://github.com/msdhundhiya/Course-selling-backend.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Course-selling-backend
    ```

3.  **Install NPM packages:**
    ```bash
    npm install
    ```

4.  **Create a `.env` file** in the root directory and add the following environment variables. Replace the values with your own.
    ```env
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```
    * `MONGO_URL`: Your connection string for the MongoDB database.
    * `JWT_SECRET`: A secret key for signing JWTs.

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

---

## API Endpoints

The API is structured into two main roles: **Admin** and **User**.

### 🔑 Authentication

| Method | Endpoint         | Description                                     |
| :----- | :--------------- | :---------------------------------------------- |
| `POST` | `/admin/signup`  | Creates a new administrator account.            |
| `POST` | `/admin/login`   | Logs in an admin and returns a JWT.             |
| `POST` | `/users/signup`  | Creates a new user account.                     |
| `POST` | `/users/login`   | Logs in a user and returns a JWT.               |

---

### 👨‍💼 Admin Routes

*Authentication required for all admin routes.*

| Method | Endpoint             | Description                                |
| :----- | :------------------- | :----------------------------------------- |
| `POST` | `/admin/courses`     | Creates a new course.                      |
| `PUT`  | `/admin/courses/:id` | Updates an existing course by its ID.      |
| `GET`  | `/admin/courses`     | Retrieves all courses created by the admin.|

---

### 👤 User Routes

*Authentication required for all user routes.*

| Method | Endpoint                  | Description                                |
| :----- | :------------------------ | :----------------------------------------- |
| `GET`  | `/users/courses`          | Retrieves a list of all published courses. |
| `POST` | `/users/courses/:id`      | Allows a user to purchase a course.        |
| `GET`  | `/users/purchasedCourses` | Retrieves all courses purchased by the user.|

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/msdhundhiya/Course-selling-backend/issues).

---
Made with ❤️ by [msdhundhiya](https://github.com/msdhundhiya)

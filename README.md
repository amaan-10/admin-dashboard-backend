# 🛡️ Role-Based Access Control (RBAC) System

![Project Banner](https://via.placeholder.com/800x200?text=RBAC+System)

## 🚀 Features
- ✅ **Authentication**: User registration, login, and logout.
- ✅ **Authorization**: Role-based access control for secure routing.
- 🔒 **Permission Management**: Assign and manage permissions dynamically.
- 🔐 **Security**: Password hashing, JWT for sessions, and secure APIs.

---

## 📚 Table of Contents
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Setup and Installation](#-setup-and-installation)
- [Endpoints](#-endpoints)
- [Key Middleware](#-key-middleware)
- [License](#-license)

---

## 🛠️ Technologies Used
![Node.js](https://img.shields.io/badge/Node.js-v16.x-green) 
![Express](https://img.shields.io/badge/Express-4.x-blue) 
![MongoDB](https://img.shields.io/badge/MongoDB-v6.x-brightgreen) 
![License](https://img.shields.io/badge/license-MIT-yellow)

---

## 📁 Project Structure
The project structure is organized as follows:
```bash
root 
│
├── models/
│   ├── User.js           # User model with roles and permissions
│   ├── Role.js           # Role model for RBAC
│   ├── Permission.js     # Permission model for dynamic permissions
│
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── roles.js          # Routes for role management
│   ├── permissions.js    # Routes for permission management
│
├── middleware/
│   ├── authMiddleware.js # JWT verification middleware
│   ├── roleMiddleware.js # Role-based authorization middleware
│
├── server.js             # Main server entry point
├── package.json          # Node.js dependencies and scripts
├── .env                  # Environment variables
└── README.md             # Project documentation
```


---

## 🧑‍💻 Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/rbac-system.git
cd rbac-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Start the Server
```bash
node server.js
```
-----
## 🔗 Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login the user | No |

* * * * *

### User (`/api/admin`)

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| GET | `/users` | Get all the users | Yes (Admin) |
| PUT | `/update-role/:id` | Update role to user by id | Yes (Admin) |
| DELETE | `/delete/:id` | Delete a user | Yes (Admin) |

* * * * *

### **Roles (`/api/roles`)**

| Method | Endpoint | Description | Protected (Role) |
| --- | --- | --- | --- |
| POST | `/create` | Create a new role | Yes (Admin) |
| GET | `/get` | Get all roles | Yes (Admin) |
| GET | `/get/:id` | Get role by ID | Yes (Admin) |
| PUT | `/update/:id` | Update role name/permissions | Yes (Admin) |
| DELETE | `/delete/:id` | Delete a role | Yes (Admin) |
| PUT | `/assign-permission` | Assign Permissions to Role | Yes (Admin) |

* * * * *

### **Permissions (`/api/permissions`)**

| Method | Endpoint | Description | Protected (Role) |
| --- | --- | --- | --- |
| POST | `/create` | Create a new permission | Yes (Admin) |
| GET | `/get` | Get all permissions | Yes (Admin) |
| DELETE | `/delete/:id` | Delete a permission | Yes (Admin) |

* * * * *

🔑 **Key Middleware**
------------------

-   **`authMiddleware.js`**:

    -   Verifies the JWT in the request header.
    -   Attaches the authenticated user's information to the request.
-   **`roleMiddleware.js`**:

    -   Checks if the authenticated user has the required role to access the route.

* * * * *

### **Authentication (`/api/auth`)**

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login and receive a JWT | No |
| POST | `/logout` | Logout the user | Yes |

📊 **Demonstration of Project**
-------------------------------------

To demonstrate the functionality of the **Role-Based Access Control (RBAC)** system, follow these steps:

### 1\. **Start the Application**

-   Make sure you've followed the [Setup and Installation](#-setup-and-installation) instructions and that the server is running locally.
-   The application should be accessible at `http://localhost:5000`.
  OR
-   Use pre-deployed application which should be accessible at `https://admin-dashboard-backend-jet.vercel.app/`.
-   Use `Postman` Application for testing all the functionalities.

### 2\. **Register a User**

-   Use the **Register** endpoint (`POST /api/auth/register`) to create a new user.
-   Example Request:

    ```bash
    {
      "username": "john_doe",
      "email": "john.doe@example.com",
      "password": "password123"
      "role": "Admin" //It can be any but only Admin has right to navigate through-out the app.
    }
    ```

### 3\. **Login as a User**

-   After registration, log in by using the **Login** endpoint (`POST /api/auth/login`) to obtain a JWT token.

-   Example Request:

    ```bash
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

-   The response will include the token:

    ```bash
    {
      "token": "your_jwt_token_here"
    }
    ```

### 4\. **Access Role-Based Endpoints**

-   Use the **JWT token** to access protected routes.
-   Example: **Get all roles** (`GET /api/roles/`) or **Create a role** (`POST /api/roles/create`) requires authentication.
-   In your request header, include the token:

    ```bash
    Authorization: your_jwt_token_here
    ```

### 5\. **Assign Roles & Permissions**

-   Once authenticated, try creating new roles and assigning permissions using the **Roles** (`POST /api/roles/create`) and **Permissions** (`POST /api/permissions/create`) endpoints.
-   Roles could be `Admin`, `User`, or `Manager`, and each role has different levels of access to various endpoints.

### 6\. **Testing Role-based Access**

-   Log in as a **User** (with basic permissions) and try accessing an endpoint that requires `Admin` role (e.g., `POST /api/roles/create`).
-   The request should be denied if the role is insufficient.

### 7\. **Check Permission Enforcement**

-   If you're an **Admin**, test accessing restricted data that only admins should be able to view.
-   You can also try modifying roles or permissions and see how the system enforces these changes.
  
📄 **License**
-----------

This project is licensed under the MIT License.

Feel free to modify and use this code as per your requirements. 🚀

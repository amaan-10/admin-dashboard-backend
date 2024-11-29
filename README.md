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

📄 **License**
-----------

This project is licensed under the MIT License.

Feel free to modify and use this code as per your requirements. 🚀

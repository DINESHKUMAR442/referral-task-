# TernaryConnect - Full-Stack Referral Tree System

A production-ready referral management system featuring a **3x3 ternary tree structure** with an atomic global placement engine. This project provides a clean, professional dashboard for visualizing and traversing deep referral networks.

## 🚀 Key Features

- **Atomic Placement Engine**: Implements a strict global sequence for referral placement, ensuring balanced growth across all branches.
- **Advanced Tree Navigation**:
    - **Node-by-Node History**: Retrace your steps one level at a time using the navigation history stack.
    - **Curved Connectors**: Smooth, organic curve lines for clear hierarchy visualization.
    - **Subtree Traversal**: Click any node to drill down into its personal 3x3 tree.
- **Premium Build UX**:
    - **Clean Dark Theme**: Minimalist, high-contrast UI designed for clarity and reduced eye strain.
    - **Password Security**: Interactive registration and login with visibility toggles.
- **Secure Architecture**: JWT-based stateless authentication with BCrypt hashing.
- **Dockerized**: Fully containerized environment for instant deployment.

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Routing**: React Router DOM (v6)
- **API Client**: Axios
- **Icons**: Lucide-React
- **Styling**: Vanilla CSS (Flat Modern aesthetic)

### Backend
- **Framework**: Java 21 (JDK 21), Spring Boot 3.4.3
- **Security**: Spring Security + JJWT (JSON Web Token)
- **Data**: Spring Data JPA + MySQL 8.0
- **Lombok**: Reduced boilerplate logic

## 📦 Project Structure

```text
Referral_task/
├── backend/                   # Spring Boot backend service
│   ├── src/main/java          # Core logic, security, placement engine
│   └── pom.xml                # Backend dependencies
├── frontend/                  # React.js frontend application
│   ├── src/components         # Reusable UI elements (TreeNode, ReferralTree)
│   ├── src/pages              # Dashboard, Auth, Home pages
│   └── package.json           # Frontend dependencies
├── docker-compose.yml         # Container orchestration
└── README.md                  # This file
```

## 🚥 Quick Start

### 🐳 Via Docker (Recommended)
1. Ensure Docker and Docker Compose are installed.
2. Run:
   ```bash
   docker-compose up --build
   ```
3. Access:
   - **App**: [http://localhost:5173](http://localhost:5173)
   - **API**: [http://localhost:8080](http://localhost:8080)

### 🛠 Local Development (Manual)

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📖 Related Documentation
- [Technical Guide](./TECHNICAL_GUIDE.md) - Deep dive into placement logic and API specs.
- [Walkthrough](./walkthrough.md) - Visual guide of the application features.

---
Built by **TernaryConnect Architecture Team**.

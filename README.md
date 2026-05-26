# StartupsHub

A full-stack startup ecosystem platform built to connect founders, investors, startups, and service providers in one place.

StartupsHub provides startup leads, funding opportunities, investor verification, Razorpay-powered premium subscription access, secure payment integration, and powerful admin management tools through a secure role-based system.

---

# Live Demo

🌐 https://startupshubapp.netlify.app

---

# Platform Overview

The platform contains multiple dashboards with secure role-based access:

- User Dashboard
- Staff Dashboard
- Admin Dashboard

Each role has protected permissions and controlled platform access.

---

# Core Features

## Authentication System

- Secure user signup and login
- JWT-based authentication
- Protected routes
- Secure cookie handling
- Password hashing using bcrypt
- Forgot password token system
- Email-based password reset flow

---

# Role-Based Access Control (RBAC)

The application uses a secure RBAC architecture with multiple user roles:

- Admin
- Staff
- Normal Users
- Verified Investors

Each role has separate permissions and protected routes.

---

# Admin Dashboard

The platform includes a powerful admin dashboard for full platform management.

---

## Secure Admin Registration

- Admin account can only be created once
- Protected using a secret admin key
- Prevents unauthorized admin creation

---

## Admin Features

### Platform Content Management

Admin can:

- Add startup leads
- Create funding opportunity cards
- Add startup listings
- Manage premium platform content


---

### Staff Management

Admin can:

- Create staff accounts
- Manage staff members
- Control operational access

---

### Investor Verification System

Admin can:

- Review investor verification requests
- Approve investor applications
- Reject investor applications
- Control startup ecosystem access

---

### Subscription Management

Admin can:

- Create subscription plans
- Update premium plans
- Manage premium feature access

---

### Payment Gateway Integration

- Integrated Razorpay payment gateway
- Real-time payment workflow architecture
- Razorpay test integration completed

---

# Staff Dashboard

The platform contains a dedicated dashboard for staff members.

## Staff Features

Staff members can:

- Access protected staff dashboard
- View platform statistics
- Manage landing page highlights
- Support content moderation
- Maintain platform content
- Assist platform operations

---

# User Dashboard

Normal users can:

- Access startup leads
- Explore funding opportunities
- Manage subscriptions
- Request investor verification
- Manage profile information
- Reset password through email

---

# Profile Management

Users can:

- View username and email
- Update profile details
- Change password
- Reset password securely via email

---

# Leads Marketplace

The platform provides startup and freelance leads.

## Features

- Lead browsing system
- Domain filtering
- Budget filtering
- Location filtering
- Project type filtering

---

## Premium Locked Content

Free users can:

- View limited lead information

Premium users can unlock:

- Full project descriptions
- Client contact information
- Complete lead details
- Premium opportunities

---

# Funding Opportunities

Users can explore startup funding programs including:

- Grants
- Seed funding
- Accelerator programs
- Investor programs

## Features

- Funding amount visibility
- Funding type categorization
- External application links
- Premium content locking system

Only selected opportunities are visible to free users while premium content remains locked.

---

# Startup Investor Verification System

Startup listings are protected using investor verification.

Only verified investors can:

- Access startup profiles
- View startup ideas
- Connect with founders
- Support startup projects

Users must submit investor verification requests before gaining access.

---

# Subscription System

The platform includes a premium subscription architecture.

## Premium Features

- Full lead access
- Contact visibility
- Complete funding access
- Startup ecosystem access
- Premium dashboard functionality

---

# Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Forgot Password Token System
- Secure Cookies
- Helmet Security Middleware
- Express Rate Limiting
- Protected API Routes
- Role-Based Authorization

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router

---

## Backend

- Node.js
- Express.js
- TypeScript

---

## Database

- PostgreSQL (NeonDB)

---

## ORM

- Prisma ORM
- Prisma Neon Adapter

---

## Authentication & Security

- JWT Authentication
- bcryptjs
- cookie-parser
- helmet
- express-rate-limit

---

## Email Services

- Nodemailer
- Resend

---

## Payment Gateway

- Razorpay Integration

---

# Deployment

## Frontend

- Netlify

## Backend

- Render

## Database

- NeonDB

---

# Backend Libraries Used

```json
{
  "express": "Backend framework",
  "typescript": "Type-safe backend development",
  "prisma": "Database ORM",
  "@prisma/client": "Prisma database client",
  "@prisma/adapter-neon": "NeonDB adapter",
  "jsonwebtoken": "JWT authentication",
  "bcryptjs": "Password hashing",
  "cookie-parser": "Cookie handling",
  "cors": "Cross-origin requests",
  "helmet": "Security middleware",
  "express-rate-limit": "API rate limiting",
  "nodemailer": "Email sending",
  "resend": "Email service integration"
}
```

---

# Project Structure

```bash
startupshub/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── routes/
│   └── services/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── config/
│   │   └── server.ts
│   │
│   ├── prisma/
│   └── dist/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/sujitha769/startupshub.git
```

---

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

# Environment Variables

Create a `.env` file inside backend folder.

```env
PORT=5000

DATABASE_URL=your_neondb_database_url

JWT_SECRET=your_jwt_secret

ADMIN_SECRET_KEY=your_admin_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_SECRET=your_razorpay_secret
```

---

# Run Frontend

```bash
npm run dev
```

---

# Run Backend

```bash
npm run dev
```

---

# Future Improvements

- Real-time startup chat system
- AI startup recommendations
- Investor-founder matchmaking
- Startup analytics dashboard
- Notification system
- Advanced admin analytics
- Mobile application support

---

# Author

## Sujitha Neelam

B.Tech Student | Full Stack Developer

GitHub:
https://github.com/sujitha769

---

# License

This project is licensed under the MIT License.

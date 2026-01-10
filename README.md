
# SwiftDrop Delivery Management System

SwiftDrop is an enterprise-grade delivery management platform designed for modern logistics networks. It provides real-time shipment orchestration, fleet monitoring, and multi-role dashboards for administrators, dispatchers, drivers, and customers.

## 🚀 Key Features

- **Real-time GPS Tracking**: Meter-perfect shipment monitoring via WebSocket relays.
- **Role-Based Access (RBAC)**: Secure partitioned interfaces for Admins, Dispatchers, Drivers, and Customers.
- **Autonomous Dispatch**: Algorithmic driver-to-order matching based on proximity and unit load.
- **Security Auditing**: Immutable forensic logs of every system mutation.
- **Financial Ledger**: Automated yield calculations and driver disbursement management.

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + Framer Motion (for cinematic transitions)
- **Mapping**: Leaflet.js
- **Communication**: Socket.io-client
- **Visualizations**: Recharts
- **Forms**: React Hook Form + Zod validation

## 📦 Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   Copy `.env.example` to `.env` and provide your backend API URL.
4. **Launch Development Server**:
   ```bash
   npm run dev
   ```

## 🧪 Testing

Run the Vitest suite for component and integration verification:
```bash
npm run test
```

## 🔐 Security

SwiftDrop implements AES-256 encryption for data exports and supports TOTP-based Multi-Factor Authentication for administrative accounts.

---
© 2024 SwiftDrop Logistics Inc. Precision in Motion.

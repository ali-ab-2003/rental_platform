# 💎 Haven — Curated Luxury Rental Platform

> **Curated luxury rentals for extraordinary stays.**

Welcome to **Haven**, an editorial-inspired luxury vacation rental platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**. Haven combines high-end aesthetic elements, smooth micro-animations, and production-grade features to deliver an unforgettable travel-booking experience.

---

## ✨ Features

### 🏡 Curated Luxury Directory
- **Premium Destinations:** Discover meticulously handpicked luxury properties from Malibu oceanfronts to cozy Aspen forest cabins.
- **Visual-First Layout:** Sleek modern cards with micro-animations, rich typography, and seamless details overlays.

### 🔑 Advanced Authentication Flow
- **Next-Auth Integration:** Secure JWT session-based login and signup built natively using Next-Auth.
- **Interactive Password Visibility:** Custom interactive eye toggle buttons integrated cleanly on password input fields.
- **Hydration-Safe Layouts:** Built-in mitigation for browser-extension conflicts using suppression warnings.

### 💬 Secure 1:1 Messaging System
- **Infinite Scrolling Messages:** Infinite message pagination powered by React Query with custom scroll-anchoring.
- **Optimistic UI Updates:** Real-time feedback for sent messages with dynamic optimistic updates.
- **Absolute Privacy Controls:** 1:1 database isolation (canonical keying) paired with secure route-level authorization, ensuring private message threads.

### 🛎️ Automated Concierge Welcome Thread
- **Instant Seeding:** New users are greeted immediately on first login with an automated sample thread with **Aria Vance (Haven Concierge)**.
- **Rich Context:** Deep conversation history pre-populated inside your messages tab covering Michelin-star chefs, sunset yacht charters, and curated digital brochures.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Usage |
|---|---|---|
| **Framework** | Next.js 16 (Turbopack) | React Server Components, App Router, REST API handlers |
| **Styling** | Tailwind CSS & Vanilla CSS | Luxury dark-mode-first styling, glassmorphic headers |
| **Animations** | Framer Motion | Fade-ins, micro-interactions, modal transitions |
| **Database** | PostgreSQL | Relational storage for listings, conversations, and users |
| **ORM** | Prisma ORM | Automated migrations, type-safe schema modeling |
| **State Management** | React Query (Tanstack) | Infinite scrolling lists, cache invalidation, polling |
| **Validation** | Zod | Robust API body and query schema validation |

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router Pages & API Handlers
│   ├── (app)/            # Authenticated application view directories (messages, etc.)
│   ├── (auth)/           # Authentication flows (login, signup layouts)
│   ├── (marketing)/      # Landing page and public property views
│   ├── api/              # Centralized backend routes (/api/messages, etc.)
│   └── globals.css       # Core Tailwind utility setup & CSS design tokens
├── components/           # Reusable atomic and layout components
│   ├── layout/           # Global Navbar, Footer, and Page Containers
│   ├── motion/           # High-performance Framer Motion presets
│   └── ui/               # Primary UI primitives (Buttons, Logo, Inputs)
├── config/               # Branding, site configurations, and nav schemes
├── features/             # Feature-grouped domains (auth, listings, messages)
│   ├── auth/             # Login/Signup forms, actions, validations
│   ├── listings/         # Directory explorer, listing cards
│   └── messages/         # MessageThreads, Bubble lists, ConversationLists
├── lib/                  # Shared utilities (Zod validations, cn utility)
└── services/             # Database service controllers (Prisma query layer)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.x or later)
- **npm** / **yarn** / **pnpm**
- **PostgreSQL** database instance (local or hosted)

### 2. Environment Setup
Create a `.env` file in the root directory and add the following configuration:
```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/haven_db?schema=public"

# Next-Auth config
NEXTAUTH_SECRET="your-super-secure-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Initialization
Generate the Prisma Client and apply migrations to your database:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Development Server
Launch the local server using Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view your brand-new premium platform!

---

## 🔌 API Documentation

### Conversations API
*   `GET /api/conversations?cursor=xxx&limit=10`
    *   Retrieves all conversations containing the authenticated user.
    *   **Response:** Paginated items list featuring the latest message snippets and participant meta-details.

### Messages API
*   `GET /api/messages?conversationId=xxx&cursor=xxx&limit=50`
    *   Retrieves the message history for a specific conversation. Requires participant authorization.
*   `POST /api/messages`
    *   Sends a message in an existing conversation thread.
    *   **Body:** `{ conversationId: "cuid", content: "your message content" }`

---

## 💎 Design System & Brand Identity
*   **Color Palette:** Curated stark contrasts (Deep Rich Blacks, Soft Slate Mutes, Ice White Foregrounds).
*   **Typography:** Elegant serif headings coupled with sleek, highly legible tracking-tight geometric body fonts.
*   **Branding Logo:** Built-in vector diamond monogram `<Logo />` rendered inline as SVGs for sharp, responsive browser layouts and high-fidelity browser tab favicons (`icon.svg`).

---

## 📜 License
Developed with 💖 by the **Haven Engineering Team**. All rights reserved.

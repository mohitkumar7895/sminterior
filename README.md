# S.M. Sanjna Interior Designer

> **Bespoke Luxury Interiors & Fine Handcrafted Furniture Atelier**  
> Built with Next.js 14 (App Router), TypeScript (TSX), Tailwind CSS, MySQL (`mysql2` direct connection), Framer Motion, and Lucide React.

---

## 1. Project Overview

**S.M. Sanjna Interior Designer** is a premium, modern, fully responsive interior design and furniture e-commerce website designed for high-end residential and commercial architecture.

The platform combines an editorial interior design showcase with an enterprise furniture shopping experience and a complete, dynamic administrative dashboard.

### Core Features

- **Luxury Aesthetic**: Warm beige, cream, dark walnut, charcoal black, and champagne gold accents.
- **Cinematic Homepage**: Full-width hero banner carousel, 14 architectural services showcase, handcrafted solid wood collection, modular kitchen spotlight, Before & After interactive slider, 5-step working process, verified client testimonials, and studio journal.
- **Furniture E-Commerce**:
  - Live search with instant modal preview.
  - Multi-attribute filtering (category, subcategory, price range, rating, popularity).
  - Product details with multiple high-res imagery, thumbnail gallery, interactive zoom, material/color/size variant selection with live price adjustment.
  - Cart with localStorage persistence, free white-glove delivery progress bar (threshold ₹25,000), promotional coupon verification (`WELCOME10`, `LUXURY5000`, `FESTIVE15`), 18% standard GST calculation, and cash-on-delivery or encrypted online checkout.
  - Instant order creation in MySQL and printable official tax invoice view.
- **14 Turnkey Interior Design Services**:
  1. Complete Home Interior Design
  2. Luxury Interior Design
  3. Modular Kitchen Design
  4. Bedroom Interior Design
  5. Living Room Design
  6. Office Interior Design
  7. Commercial Interior Design
  8. Furniture Manufacturing
  9. Custom Wooden Furniture
  10. Wardrobe Design
  11. False Ceiling
  12. Lighting Design
  13. Space Planning
  14. Renovation Services
- **Full Interactive Admin Panel (`/admin`)**:
  - Dashboard analytics: Total revenue in INR, live orders, products, categories, leads.
  - Complete product CRUD with multiple image uploads, stock management, and variant pricing.
  - Category and subcategory management with department banner images.
  - Service management to update starting price benchmarks and schedules without code changes.
  - Portfolio project management with Before & After site transformation sliders.
  - Order management with order status workflow (Pending → Processing → Dispatched → Delivered → Cancelled), payment status, and customer tracking.
  - Inquiry & Consultation management for contact submissions, 3D consultation bookings, and quotation requests.
  - Dynamic SEO Management: Edit Meta Titles, Meta Descriptions, Keywords, Canonical URLs, OpenGraph social cards, H1 tags, and Google indexing settings for any page route.
  - System configuration: Studio contact numbers, address, free shipping thresholds, GST rates, COD toggles, and payment keys.

---

## 2. Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (TSX)
- **Styling**: Tailwind CSS
- **Database**: MySQL (Database: `svinterior`)
- **Driver**: `mysql2/promise` (Direct SQL queries with connection pooling, transactions, and parameterized SQL injection prevention. **NO Prisma, NO Drizzle, NO MongoDB**)
- **State Management**: React Context API (`CartContext`, `WishlistContext`, `AuthContext`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: JWT with HTTP-only secure cookies and bcrypt password hashing

---

## 3. Database Architecture

Database Name: `svinterior`  
Driver: `mysql2/promise` with pool management in `lib/db.ts`

The database schema (`database/schema.sql`) implements all 35 relational tables:
1. `admins`
2. `users`
3. `roles`
4. `categories`
5. `subcategories`
6. `products`
7. `product_images`
8. `product_variants`
9. `services`
10. `projects`
11. `project_images`
12. `testimonials`
13. `blogs`
14. `blog_categories`
15. `banners`
16. `homepage_sections`
17. `navigation_menus`
18. `pages`
19. `seo_metadata`
20. `faqs`
21. `inquiries`
22. `consultations`
23. `quotations`
24. `orders`
25. `order_items`
26. `payments`
27. `addresses`
28. `carts`
29. `cart_items`
30. `wishlists`
31. `wishlist_items`
32. `coupons`
33. `newsletter_subscribers`
34. `settings`
35. `contact_details`

---

## 4. Default Credentials

- **Admin Login Route**: `/admin/login`
- **Email**: `admin@smsanjna.com`
- **Password**: `admin123`

---

## 5. Getting Started

### Prerequisites

- Node.js (v18.0 or newer)
- MySQL / MariaDB Server running on port 3306

### Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Ensure MySQL connection details match your local server:

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=svinterior
JWT_SECRET=sm_sanjna_interior_super_secure_jwt_token_secret_key_2025
```

### Initialize and Seed Database

Run the automated database creation and rich data seeding scripts:

```bash
# Initialize schema and 35 tables
npm run db:init

# Seed initial categories, 14 services, luxury products, portfolio, testimonials, and admin
npm run db:seed
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 6. Directory Structure

```
├── app/
│   ├── (website)/             # Public pages (Home, About, Services, Furniture, Portfolio, Cart, Checkout)
│   ├── admin/                 # Executive Admin Portal & Dashboard
│   ├── api/                   # REST API routes (Auth, Products, Services, Orders, Inquiries, SEO)
│   ├── globals.css            # Luxury Tailwind CSS styles & typography variables
│   ├── layout.tsx             # Root layout with Schema JSON-LD & Context providers
│   ├── robots.ts              # Dynamic robots.txt
│   └── sitemap.ts             # Dynamic XML sitemap
├── components/
│   ├── home/                  # Homepage modular sections (Hero, About, Services, Kitchen, etc.)
│   ├── layout/                # Global layout (Navbar, AnnouncementBar, Footer, SearchModal, etc.)
│   └── ui/                    # Reusable UI widgets (ProductCard, ServiceCard, BeforeAfterSlider, etc.)
├── context/
│   ├── CartContext.tsx        # Cart state, discount coupons, free shipping progress
│   ├── WishlistContext.tsx    # Wishlist state & local storage sync
│   └── AuthContext.tsx        # Authentication & global modal state
├── database/
│   └── schema.sql             # Pure MySQL schema definition (35 tables)
├── lib/
│   ├── db.ts                  # mysql2/promise connection pool & query helpers
│   └── auth/                  # JWT signing, cookie verification, bcrypt helpers
├── models/                    # Typed data models & parameterized query functions
│   ├── product.ts
│   ├── category.ts
│   ├── service.ts
│   ├── project.ts
│   ├── order.ts
│   ├── inquiry.ts
│   ├── content.ts
│   └── seo.ts
└── scripts/
    ├── init-db.js             # Automated DB initialization script
    └── seed-db.js             # Rich seed script with luxury content
```


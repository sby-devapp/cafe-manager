# Café Management System – User Roles & Permissions

## User Roles

| Role          | Description                                  |
|---------------|----------------------------------------------|
| **Client**    | A customer placing orders in the café        |
| **Waiter**    | Staff member who takes and manages orders    |
| **Barista**   | Staff member preparing drinks/food           |
| **Admin**     | Café owner or manager with full control      |
| **App Owner** | Developer (you) – manages licensing          |

---

## User Permissions & Responsibilities

### 1. Client
- Can view the menu (products, prices, descriptions)
- Can create an order (one or multiple items)
- Can add special instructions per item (e.g., "no sugar", "extra shot")
- Can edit their order before confirmation
- Can confirm or cancel the order
- Cannot access other clients’ orders

> **Goal**: Simple, intuitive interface for self-service or waiter-assisted ordering.

---

### 2. Waiter
- Can receive and view incoming orders from clients
- Can confirm, modify, or reject orders
- Can create an order on behalf of a client
- Can add new products (if permitted)
- Can generate a bill after payment
- Can split bills or apply discounts (if allowed)

> **Goal**: Efficient order handling and billing support.

---

### 3. Barista
- Can view all assigned orders (e.g., coffee, food prep)
- Can confirm receipt of an order
- Can update order status (e.g., "Preparing", "Ready")
- Can mark order as ready for pickup
- Can add new products (e.g., daily specials)

> **Goal**: Real-time visibility and workflow tracking in the kitchen/bar.

---

### 4. Admin (Café Owner/Manager)
- Full access to the **management dashboard**
- Can add, edit, or remove menu products
- Can manage categories (e.g., Coffee, Pastries)
- Can view sales reports:
  - Daily/Weekly/Monthly revenue
  - Top-selling items
  - Profit & benefits analysis
- Can manage user accounts (Waiters, Baristas)
- Can set pricing, taxes, and discounts
- Can export data (CSV, PDF)

> **Goal**: Business oversight, performance tracking, and control.

---

### 5. App Owner (You – Developer)
- Responsible for app licensing and distribution
- Can generate license keys for each café
- Can bind licenses to hardware (machine fingerprint)
- Can disable unauthorized copies remotely
- Can collect anonymous usage data (optional)
- Future: Offer updates, support, and premium features

> **Goal**: Protect your software, prevent piracy, and maintain control.

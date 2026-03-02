# Stripe Payment Links — All Services

> **Status**: Pending creation
> **Created**: 2026-03-01
> **Purpose**: Reference for all Stripe products, prices, and payment links across 3 services

---

## How to Create (Stripe CLI)

For each product below, run three commands:

```bash
# 1. Create the product
stripe products create --name "PRODUCT NAME" --description "DESCRIPTION"
# Note the prod_XXX ID from output

# 2. Create the price (one-time)
stripe prices create --product prod_XXX --unit-amount AMOUNT_IN_CENTS --currency usd

# 2b. Create the price (recurring/monthly)
stripe prices create --product prod_XXX --unit-amount AMOUNT_IN_CENTS --currency usd --recurring[interval]=month

# 3. Create the payment link
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

Alternatively, create all of these in the [Stripe Dashboard](https://dashboard.stripe.com/products).

---

## Service 1: AI Automation

### 1. Starter Setup — $3,000 (one-time)

| Field | Value |
|-------|-------|
| **Product Name** | AI Automation - Starter Setup |
| **Description** | Voice AI receptionist setup with basic call handling and appointment booking |
| **Amount** | $3,000.00 (300000 cents) |
| **Type** | One-time |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "AI Automation - Starter Setup" --description "Voice AI receptionist setup with basic call handling and appointment booking"
stripe prices create --product prod_XXX --unit-amount 300000 --currency usd
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 2. Starter Monthly — $150/mo (recurring)

| Field | Value |
|-------|-------|
| **Product Name** | AI Automation - Starter Monthly |
| **Description** | Ongoing Voice AI receptionist service — call handling, basic support, monthly optimization |
| **Amount** | $150.00/month (15000 cents) |
| **Type** | Recurring (monthly) |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "AI Automation - Starter Monthly" --description "Ongoing Voice AI receptionist service — call handling, basic support, monthly optimization"
stripe prices create --product prod_XXX --unit-amount 15000 --currency usd --recurring[interval]=month
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 3. Growth Setup — $8,000 (one-time)

| Field | Value |
|-------|-------|
| **Product Name** | AI Automation - Growth Setup |
| **Description** | Full Voice AI + lead capture + CRM integration + appointment booking setup |
| **Amount** | $8,000.00 (800000 cents) |
| **Type** | One-time |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "AI Automation - Growth Setup" --description "Full Voice AI + lead capture + CRM integration + appointment booking setup"
stripe prices create --product prod_XXX --unit-amount 800000 --currency usd
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 4. Growth Monthly — $250/mo (recurring)

| Field | Value |
|-------|-------|
| **Product Name** | AI Automation - Growth Monthly |
| **Description** | Ongoing Voice AI + lead capture + CRM service — full support, analytics, monthly optimization |
| **Amount** | $250.00/month (25000 cents) |
| **Type** | Recurring (monthly) |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "AI Automation - Growth Monthly" --description "Ongoing Voice AI + lead capture + CRM service — full support, analytics, monthly optimization"
stripe prices create --product prod_XXX --unit-amount 25000 --currency usd --recurring[interval]=month
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 5. Enterprise Setup — $15,000 (one-time)

| Field | Value |
|-------|-------|
| **Product Name** | AI Automation - Enterprise Setup |
| **Description** | Complete AI automation suite — Voice AI, lead capture, CRM, multi-location, custom integrations |
| **Amount** | $15,000.00 (1500000 cents) |
| **Type** | One-time |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "AI Automation - Enterprise Setup" --description "Complete AI automation suite — Voice AI, lead capture, CRM, multi-location, custom integrations"
stripe prices create --product prod_XXX --unit-amount 1500000 --currency usd
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 6. Enterprise Monthly — $400/mo (recurring)

| Field | Value |
|-------|-------|
| **Product Name** | AI Automation - Enterprise Monthly |
| **Description** | Ongoing Enterprise AI automation — priority support, dedicated account manager, continuous optimization |
| **Amount** | $400.00/month (40000 cents) |
| **Type** | Recurring (monthly) |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "AI Automation - Enterprise Monthly" --description "Ongoing Enterprise AI automation — priority support, dedicated account manager, continuous optimization"
stripe prices create --product prod_XXX --unit-amount 40000 --currency usd --recurring[interval]=month
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

---

## Service 2: Website Design

### 1. Starter Package — $2,500 (one-time)

| Field | Value |
|-------|-------|
| **Product Name** | Website Design - Starter Package |
| **Description** | Professional 3-5 page website with responsive design, SEO basics, and contact form |
| **Amount** | $2,500.00 (250000 cents) |
| **Type** | One-time |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "Website Design - Starter Package" --description "Professional 3-5 page website with responsive design, SEO basics, and contact form"
stripe prices create --product prod_XXX --unit-amount 250000 --currency usd
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 2. Professional Package — $5,000 (one-time)

| Field | Value |
|-------|-------|
| **Product Name** | Website Design - Professional Package |
| **Description** | Full business website with custom design, CMS, lead capture, booking integration, and SEO optimization |
| **Amount** | $5,000.00 (500000 cents) |
| **Type** | One-time |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "Website Design - Professional Package" --description "Full business website with custom design, CMS, lead capture, booking integration, and SEO optimization"
stripe prices create --product prod_XXX --unit-amount 500000 --currency usd
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 3. Premium Package — $8,000 (one-time)

| Field | Value |
|-------|-------|
| **Product Name** | Website Design - Premium Package |
| **Description** | Premium website with AI features, advanced animations, e-commerce, analytics dashboard, and priority delivery |
| **Amount** | $8,000.00 (800000 cents) |
| **Type** | One-time |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "Website Design - Premium Package" --description "Premium website with AI features, advanced animations, e-commerce, analytics dashboard, and priority delivery"
stripe prices create --product prod_XXX --unit-amount 800000 --currency usd
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 4. Monthly Retainer — $200/mo (recurring)

| Field | Value |
|-------|-------|
| **Product Name** | Website Design - Monthly Retainer |
| **Description** | Ongoing website maintenance, content updates, performance monitoring, and priority support |
| **Amount** | $200.00/month (20000 cents) |
| **Type** | Recurring (monthly) |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "Website Design - Monthly Retainer" --description "Ongoing website maintenance, content updates, performance monitoring, and priority support"
stripe prices create --product prod_XXX --unit-amount 20000 --currency usd --recurring[interval]=month
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

---

## Service 3: Creator Tools (SaaS)

### 1. Self-Serve — $49/mo (recurring)

| Field | Value |
|-------|-------|
| **Product Name** | Creator Tools - Self-Serve |
| **Description** | AI content creation platform — caption generation, hook writing, analytics, and scheduling tools |
| **Amount** | $49.00/month (4900 cents) |
| **Type** | Recurring (monthly) |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "Creator Tools - Self-Serve" --description "AI content creation platform — caption generation, hook writing, analytics, and scheduling tools"
stripe prices create --product prod_XXX --unit-amount 4900 --currency usd --recurring[interval]=month
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 2. Managed — $297/mo (recurring)

| Field | Value |
|-------|-------|
| **Product Name** | Creator Tools - Managed |
| **Description** | Full-service AI content management — all Self-Serve features + dedicated content strategist, brand voice training, weekly optimization calls |
| **Amount** | $297.00/month (29700 cents) |
| **Type** | Recurring (monthly) |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "Creator Tools - Managed" --description "Full-service AI content management — all Self-Serve features + dedicated content strategist, brand voice training, weekly optimization calls"
stripe prices create --product prod_XXX --unit-amount 29700 --currency usd --recurring[interval]=month
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

### 3. Enterprise — $997/mo (recurring)

| Field | Value |
|-------|-------|
| **Product Name** | Creator Tools - Enterprise |
| **Description** | Enterprise AI content suite — unlimited usage, custom AI model training, white-label options, API access, dedicated account team |
| **Amount** | $997.00/month (99700 cents) |
| **Type** | Recurring (monthly) |
| **Stripe Product ID** | `prod_` |
| **Stripe Price ID** | `price_` |
| **Payment Link** | |

```bash
stripe products create --name "Creator Tools - Enterprise" --description "Enterprise AI content suite — unlimited usage, custom AI model training, white-label options, API access, dedicated account team"
stripe prices create --product prod_XXX --unit-amount 99700 --currency usd --recurring[interval]=month
stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

---

## Summary Table

| # | Service | Tier | Price | Type | Payment Link |
|---|---------|------|-------|------|--------------|
| 1 | AI Automation | Starter Setup | $3,000 | One-time | |
| 2 | AI Automation | Starter Monthly | $150/mo | Recurring | |
| 3 | AI Automation | Growth Setup | $8,000 | One-time | |
| 4 | AI Automation | Growth Monthly | $250/mo | Recurring | |
| 5 | AI Automation | Enterprise Setup | $15,000 | One-time | |
| 6 | AI Automation | Enterprise Monthly | $400/mo | Recurring | |
| 7 | Website Design | Starter Package | $2,500 | One-time | |
| 8 | Website Design | Professional Package | $5,000 | One-time | |
| 9 | Website Design | Premium Package | $8,000 | One-time | |
| 10 | Website Design | Monthly Retainer | $200/mo | Recurring | |
| 11 | Creator Tools | Self-Serve | $49/mo | Recurring | |
| 12 | Creator Tools | Managed | $297/mo | Recurring | |
| 13 | Creator Tools | Enterprise | $997/mo | Recurring | |

**Total products to create: 13**
**One-time payments: 5**
**Recurring subscriptions: 8**

---

## Quick-Run Script

Copy-paste this entire block to create all 13 products in one go. Replace `prod_XXX` and `price_XXX` with actual IDs as they are returned.

```bash
#!/bin/bash
# Stripe Payment Link Creation Script
# Run each section, note the IDs, then update the payment links table above

echo "=== AI AUTOMATION ==="

echo "--- Starter Setup ($3,000 one-time) ---"
stripe products create --name "AI Automation - Starter Setup" --description "Voice AI receptionist setup with basic call handling and appointment booking"
# stripe prices create --product prod_XXX --unit-amount 300000 --currency usd
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Starter Monthly ($150/mo) ---"
stripe products create --name "AI Automation - Starter Monthly" --description "Ongoing Voice AI receptionist service — call handling, basic support, monthly optimization"
# stripe prices create --product prod_XXX --unit-amount 15000 --currency usd --recurring[interval]=month
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Growth Setup ($8,000 one-time) ---"
stripe products create --name "AI Automation - Growth Setup" --description "Full Voice AI + lead capture + CRM integration + appointment booking setup"
# stripe prices create --product prod_XXX --unit-amount 800000 --currency usd
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Growth Monthly ($250/mo) ---"
stripe products create --name "AI Automation - Growth Monthly" --description "Ongoing Voice AI + lead capture + CRM service — full support, analytics, monthly optimization"
# stripe prices create --product prod_XXX --unit-amount 25000 --currency usd --recurring[interval]=month
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Enterprise Setup ($15,000 one-time) ---"
stripe products create --name "AI Automation - Enterprise Setup" --description "Complete AI automation suite — Voice AI, lead capture, CRM, multi-location, custom integrations"
# stripe prices create --product prod_XXX --unit-amount 1500000 --currency usd
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Enterprise Monthly ($400/mo) ---"
stripe products create --name "AI Automation - Enterprise Monthly" --description "Ongoing Enterprise AI automation — priority support, dedicated account manager, continuous optimization"
# stripe prices create --product prod_XXX --unit-amount 40000 --currency usd --recurring[interval]=month
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "=== WEBSITE DESIGN ==="

echo "--- Starter Package ($2,500 one-time) ---"
stripe products create --name "Website Design - Starter Package" --description "Professional 3-5 page website with responsive design, SEO basics, and contact form"
# stripe prices create --product prod_XXX --unit-amount 250000 --currency usd
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Professional Package ($5,000 one-time) ---"
stripe products create --name "Website Design - Professional Package" --description "Full business website with custom design, CMS, lead capture, booking integration, and SEO optimization"
# stripe prices create --product prod_XXX --unit-amount 500000 --currency usd
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Premium Package ($8,000 one-time) ---"
stripe products create --name "Website Design - Premium Package" --description "Premium website with AI features, advanced animations, e-commerce, analytics dashboard, and priority delivery"
# stripe prices create --product prod_XXX --unit-amount 800000 --currency usd
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Monthly Retainer ($200/mo) ---"
stripe products create --name "Website Design - Monthly Retainer" --description "Ongoing website maintenance, content updates, performance monitoring, and priority support"
# stripe prices create --product prod_XXX --unit-amount 20000 --currency usd --recurring[interval]=month
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "=== CREATOR TOOLS ==="

echo "--- Self-Serve ($49/mo) ---"
stripe products create --name "Creator Tools - Self-Serve" --description "AI content creation platform — caption generation, hook writing, analytics, and scheduling tools"
# stripe prices create --product prod_XXX --unit-amount 4900 --currency usd --recurring[interval]=month
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Managed ($297/mo) ---"
stripe products create --name "Creator Tools - Managed" --description "Full-service AI content management — all Self-Serve features + dedicated content strategist, brand voice training, weekly optimization calls"
# stripe prices create --product prod_XXX --unit-amount 29700 --currency usd --recurring[interval]=month
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1

echo "--- Enterprise ($997/mo) ---"
stripe products create --name "Creator Tools - Enterprise" --description "Enterprise AI content suite — unlimited usage, custom AI model training, white-label options, API access, dedicated account team"
# stripe prices create --product prod_XXX --unit-amount 99700 --currency usd --recurring[interval]=month
# stripe payment_links create --line-items[0][price]=price_XXX --line-items[0][quantity]=1
```

---

## Notes

- All amounts use USD
- Stripe amounts are in **cents** (e.g., $3,000 = 300000)
- After creating each product, immediately run the price + payment link commands using the returned IDs
- Fill in the Product ID, Price ID, and Payment Link URL in each section's table as you go
- Update the Summary Table at the top with all payment link URLs when done
- Payment links can also be created in the Stripe Dashboard under Products > Payment Links

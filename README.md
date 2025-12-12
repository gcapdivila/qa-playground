# QA Playground

This repository contains a lightweight demo web application used as a **QA playground**.

The application itself is intentionally simple.
The focus of this project is **test quality, structure, and maintainability**, not feature complexity.

It is designed to serve as a realistic target for:
- UI automation
- API testing
- Visual regression
- Test architecture experiments

---

## 🎯 Purpose

This playground is used to demonstrate:

- Playwright UI automation
- Role-based access control & permissions testing
- API testing (Postman / Newman)
- Visual regression testing
- Selenium / Robot Framework examples
- CI/CD integration
- K6 scripts (targeting a separate API for load testing)

The goal is not to cover every possible scenario,
but to showcase **how tests are structured, named, and maintained**.

---

## 📄 Application pages

The application simulates a small platform with authentication and protected routes:

- `index.html` – Homepage
- `login.html` – Fake login flow (guest / editor / admin)
- `form.html` – Multi-step form
- `table.html` – Dynamic table (sorting, filtering, inline edit)
- `actions.html` – UI actions (modal, loader…)
- `errors.html` – Error scenarios
- `visual.html` – Visual regression components
- `admin.html` – Admin-only page

---

## 🔐 Permissions & roles

The playground includes a simple role system:

- **Guest** – public pages only
- **Editor** – access to main functional pages
- **Admin** – access to admin area

Permissions are intentionally enforced both:
- at navigation level
- at UI level (menu visibility)

---

## 🔌 API endpoints

Serverless functions hosted on Vercel:

- `/api/login`
- `/api/users`
- `/api/products`

These endpoints are used to support:
- authentication scenarios
- API tests
- negative and error cases

---

## 🧪 Test approach

Tests focus on:
- readability
- clear intent
- separation between actions and assertions
- minimal duplication

Notable aspects:
- Page Objects & UI components
- Typed fixtures
- Custom Playwright matchers (DSL-style expectations)
- Role-based permission tests

---

## 🚀 Why this playground?

This project is intentionally **small in scope**,
but aims to reflect how I approach **Quality Engineering in real projects**:

- tests as a product
- clarity over cleverness
- maintainability over volume

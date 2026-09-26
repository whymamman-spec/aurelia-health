# Aurelia Health

A modern full-stack healthcare platform that enables patients to book appointments, locate doctors, and manage their hospital visits while providing reception staff with live appointment and queue management tools.

> **Portfolio Project** — Built with React, Node.js, Express and SQLite using professional Git workflows and feature branching.

---

## Project Status

**Current Milestone:** Reception Dashboard & Patient Portal (Milestone 4.1)

**Status:** 🟢 Active Development

Aurelia Health has progressed from a marketing hospital website into a functional appointment management system with live backend APIs and receptionist operations.

---

## Vision

Aurelia Health is being built as a premium, production-oriented healthcare platform combining:

- Public hospital website
- Patient appointment portal
- Receptionist operations dashboard
- Doctor & department directory
- Queue management
- Staff management portal
- Future cross-platform mobile application

---

## Milestone Progress

| Milestone                             | Status      |
| ------------------------------------- | ----------- |
| Product Foundation                    | ✅ Complete |
| Design System & UI Components         | ✅ Complete |
| Marketing Website                     | ✅ Complete |
| Doctors & Departments (Live API)      | ✅ Complete |
| Patient Appointment Booking           | ✅ Complete |
| Appointment Lookup                    | ✅ Complete |
| Doctor Slot Availability              | ✅ Complete |
| Cancellation & Rescheduling           | ✅ Complete |
| Reception Dashboard                   | ✅ Complete |
| Reception Operations (Check-in Queue) | ⏳ Next     |

---

## Current Features

### Patient Portal

- Book appointments with 30-minute consultation slots (09:00–16:30)
- Department and doctor selection
- Live doctor-specific availability
- Automatic queue number generation
- Unique booking reference codes
- Retrieve appointments using booking reference
- Cancel appointments
- Reschedule appointments without changing the booking reference
- Automatic slot release after cancellation or rescheduling

### Reception Dashboard

- Daily appointment KPI cards
- Confirmed appointment count
- Cancelled appointment count
- Department statistics
- Today's appointment schedule table
- Live dashboard powered by REST APIs

### Hospital Website

- Responsive homepage
- Services page
- Doctors directory
- Departments directory
- About & Contact pages
- Reusable design system components

---

## Technology Stack

### Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- SQLite

### Development Tools

- Git & GitHub
- Feature Branch Workflow
- Conventional Commits
- VS Code

---

## Project Structure

```text
aurelia-health/
│
├── client/                 # React frontend
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   └── assets/
│
├── server/                 # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   └── database/
│
└── README.md
```

---

## Development Philosophy

This project follows professional software engineering practices:

- Feature branch development
- Conventional Git commits
- Modular component architecture
- RESTful API design
- Responsive, mobile-first UI
- Reusable frontend components
- Documentation-driven development

---

## Current Branch

`feature/receptionist-dashboard`

### Last Completed Milestone

**Reception Dashboard & Patient Portal Management**

Implemented:

- Live appointment booking
- Booking reference lookup
- Doctor-specific slot locking
- Cancellation workflow
- Rescheduling workflow
- Reception KPI dashboard
- Daily appointment schedule

---

## Next Milestone

**Reception Operations**

Planned functionality:

- Patient check-in
- Live waiting queue
- In-consultation status
- Completed consultations
- Queue analytics
- Reception workflow management

---

**Project Codename:** Aurelia Health

**Maintainer:** Yusuf Mamman

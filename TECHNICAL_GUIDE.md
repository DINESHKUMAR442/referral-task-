# Technical Guide - TernaryConnect

This document provides a deep dive into the internal mechanics of the referral tree system.

## 1. The 3x3 Global Placement Logic

The core value of this system is the **Ternary Tree Structure**. Every user has exactly 3 positions: **A**, **B**, and **C**.

### Global Sequential Cycle
To ensure the tree grows evenly, registration without a specific parent follows an **Atomic Global Sequence**. For a user with offspring A, B, and C:
1. Child A's Level 1 positions are filled first (A1, A2, A3).
2. Child B's Level 1 positions are filled (B1, B2, B3).
3. Child C's Level 1 positions are filled (C1, C2, C3).

This cycle repeats globally, ensuring no single branch dominates unless specifically targeted.

## 2. Navigation Architecture

### History Stack
The frontend implements a **History Stack** (Array of UIDs) to manage deep tree navigation.
- **Push**: When clicking a child node, the current view's UID is pushed to the stack.
- **Pop**: Clicking "Back" pops the last UID and restores that view.
- **Reset**: Navigating back to "My Home" clears the stack completely.

## 3. API Specification

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | No | Creates a new user. Auto-placed if parent UID is missing. |
| `/api/auth/login` | POST | No | Returns a Bearer JWT Token on success. |
| `/api/tree/subtree/{uid}` | GET | Yes | Retrieves a recursive JSON object of the 3x3 tree for the given UID. |
| `/api/user/profile` | GET | Yes | Returns stats (Referral count, UID, Join date). |

## 4. Frontend Component Hierarchy

- **Dashboard**: Root container, manages Global State (History, Auth).
- **ReferralTree**: Manages the viewport and tree header controls.
- **TreeNode**: Recursive component that renders the node itself and its 3 children. It handles the curved CSS connector transitions.

## 5. Security Model
- **Stateless JWT**: Tokens are issued upon login and validated per request in the `JwtAuthenticationFilter`.
- **CORS Support**: Configured to allow cross-origin requests from the React frontend port (5173).

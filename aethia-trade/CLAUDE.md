# Aethia Trade - Execution & Build Guide

## Commands

### Setup
- Install frontend dependencies: `cd frontend && npm install`

### Run Dev Servers
- Start Next.js Frontend (port 3000): `npm run dev:frontend`
- Start FastAPI Backend (port 8000): `npm run dev:backend`

### Production Build
- Build Next.js: `npm run build:frontend`

---

## 4-Layer Architecture Directory Layout
- [frontend/](file:///Users/ayushisharma/aethia-trade/frontend/) - Next.js UI, Pages, and Styling
- [backend/](file:///Users/ayushisharma/aethia-trade/backend/) - FastAPI Gateway, Routers, Database
- [ai/](file:///Users/ayushisharma/aethia-trade/ai/) - Planner, Risk, Consensus, and Explainability Agents
- [blockchain/](file:///Users/ayushisharma/aethia-trade/blockchain/) - Solidity smart contracts & cryptographic signature/hashing helpers

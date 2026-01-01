# Betting System

## Goals
- Find +EV betting opportunities
- Execute bets safely and selectively
- Avoid bookmaker detection

## Non-Goals
- High-frequency scraping
- Guaranteed profits
- ToS compliance guarantees

## Architecture
- Node.js + TypeScript control plane
- Python pricing engine
- Playwright execution workers

## Safety Rules
- EXECUTION_ENABLED=false by default
- Manual validation before automation
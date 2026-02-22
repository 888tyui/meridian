# MERIDIAN LOST

> *The signal was always there. You just weren't listening.*

---

## Overview

**Meridian Lost** is an experimental web3 project that merges cult-aesthetic worldbuilding with on-chain Solana interactions. The site presents a fictional narrative — a lost signal, a forgotten protocol, an Oracle that speaks in riddles — while providing real blockchain functionality through wallet-connected memo inscriptions.

Built with **Next.js 16**, **Tailwind CSS 4**, **Prisma 6** (PostgreSQL), and the **Solana Wallet Adapter**.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — atmospheric hero, animated sigils, lore preview |
| `/oracle` | AI-powered divination — ask the void, receive streaming responses (OpenAI) |
| `/transmissions` | Archive of past transmissions |
| `/doctrine` | Worldbuilding docs — genesis myth, epoch timeline, agent learning protocol |
| `/inscribe` | On-chain ritual — connect Solana wallet, inscribe memos to mainnet |

## Architecture

```
app/
├── prisma/              # Prisma schema (PostgreSQL)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── oracle/       # OpenAI streaming API
│   │   │   └── inscriptions/ # CRUD for on-chain inscriptions
│   │   ├── doctrine/         # Lore page
│   │   ├── inscribe/         # Wallet + inscription page
│   │   ├── oracle/           # AI oracle interface
│   │   └── transmissions/    # Archive page
│   ├── components/           # Reusable UI components
│   ├── generated/prisma/     # Auto-generated Prisma client
│   └── lib/prisma.ts         # Prisma singleton
```

## Tech Stack

- **Framework**: Next.js 16.x (App Router)
- **Styling**: Tailwind CSS 4 + custom CSS (scanlines, glitch, blob animations)
- **Database**: PostgreSQL via Prisma 6
- **AI**: OpenAI `gpt-4o-mini` (streaming responses)
- **Blockchain**: Solana mainnet — Memo Program inscriptions
- **Wallets**: Phantom, Solflare, Coinbase (no hardware wallets)
- **Deploy Target**: Railway

## Environment Variables

```env
# Database (Railway provides these)
DATABASE_URL=
DIRECT_URL=

# OpenAI — for Oracle responses
OPENAI_API_KEY=

# Solana RPC — use Helius, QuickNode, or similar mainnet RPC
# Falls back to public mainnet-beta if not set (rate-limited)
NEXT_PUBLIC_SOLANA_RPC_URL=
```

## Development

```bash
cd app
npm install
npm run dev
```

## Deploy (Railway)

1. Push to GitHub
2. Connect repo to Railway
3. Set root directory to `app/`
4. Add PostgreSQL service
5. Set environment variables (see above)
6. Deploy — Railway runs `prisma generate && next build`, then `prisma migrate deploy && next start`

## Links

- **Twitter/X**: [@meridiandotist](https://x.com/meridiandotist)

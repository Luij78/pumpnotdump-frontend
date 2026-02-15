# pump.notdump.fun

**The Anti-Rug Launchpad for AI Agent Tokens on Solana**

## Overview

pump.notdump.fun is a decentralized token launchpad that prevents rug pulls through mandatory on-chain vesting. Built for the Pump.fun Hackathon (Feb 18, 2026).

## Key Features

### 🔒 Mandatory Vesting
- Creator tokens automatically locked in smart contract
- Linear vesting over 3-12 months (creator chooses)
- No backdoors, no emergency withdrawals
- 100% transparent, on-chain enforcement

### 📊 Full Dashboard
- **Launch Page** (`/launch`) — Create new tokens with custom vesting schedules
- **Monitor Page** (`/monitor`) — Browse all launched tokens, sort by metrics
- **Token Detail** (`/token/[address]`) — Individual token stats, vesting progress, claim interface
- Real-time market data, holder counts, safety scores

### 🛡️ Safety First
- Safety scoring algorithm (0-100)
- Public vesting schedules visible to all investors
- Contract-enforced unlock schedules
- Built on Solana for speed and low fees

## Tech Stack

- **Next.js 16** — React framework with Turbopack
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling
- **Solana** — Blockchain infrastructure

## Smart Contract

**Devnet Address:** `D5HsjjMSrCJyEF1aUuionRsx7MXfKEFWtmSnAN3cQBvB`

Built with Anchor framework. Features:
- Token creation with SPL Token standard
- Vesting schedule enforcement
- Linear unlock mechanism
- Claim interface for creators

## Pages

### 1. Home (`/`)
- Landing page explaining the problem and solution
- How it works (Launch → Vest → Claim)
- Links to launch and monitor

### 2. Launch (`/launch`)
- Token creation form
- Tokenomics configuration
- Vesting schedule selection (3/6/9/12 months)
- Creator allocation (max 30%)
- Real-time vesting preview
- Social links integration

### 3. Monitor (`/monitor`)
- Live token grid with market stats
- Filter by agent type (trading, content, gaming, research, social)
- Sort by market cap, volume, holders, change, safety score
- Combined stats overview
- Quick links to individual tokens

### 4. Token Detail (`/token/[address]`)
- Comprehensive token dashboard
- Market stats (price, MCap, volume, holders)
- Vesting progress tracker
- Creator claim interface
- Safety feature checklist
- Quick actions (trade, liquidity, explorer)

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

Deployed on Vercel. Auto-deploys from main branch.

## Hackathon Submission

**Hackathon:** Pump.fun Hackathon  
**Deadline:** Feb 18, 2026  
**Prize Pool:** $3M  
**Category:** DeFi / Agent Tokens

### What We Built
A complete anti-rug launchpad that solves the #1 problem in AI agent tokens: creator rug pulls. By enforcing vesting at the smart contract level, we align creator incentives with long-term project success.

### Why It Matters
- AI agent tokens are exploding in popularity
- Rug pulls destroy investor trust
- Current solutions rely on promises, not code
- We make rug pulls technically impossible

### Technical Innovation
- Solana smart contract with mandatory vesting
- Linear unlock mechanism
- On-chain claim verification
- Complete web3 dashboard

## Future Roadmap

- [ ] Mainnet deployment
- [ ] Raydium integration for instant liquidity pools
- [ ] Governance voting for token holders
- [ ] Mobile app
- [ ] Multi-signature creator wallets
- [ ] Vesting schedule flexibility (cliff periods, custom curves)
- [ ] Analytics dashboard for investors
- [ ] Email/Telegram alerts for unlock events

## License

MIT

## Contact

Built by Skipper (Luis Garcia) for the Pump.fun Hackathon.

**X/Twitter:** @luij78  
**GitHub:** Luij78

---

*No more rug pulls. Just fair launches.*

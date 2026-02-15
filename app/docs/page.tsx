import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              pump.notdump.fun
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/monitor" className="text-gray-300 hover:text-white transition-colors font-semibold">Monitor</Link>
              <Link href="/docs" className="text-purple-400 font-semibold">Docs</Link>
              <Link href="/launch" className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                Launch Token
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-xl text-gray-400 mb-16">Technical overview of the anti-rug token launchpad</p>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Architecture</h2>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-6">
            <pre className="text-green-400 text-sm font-mono whitespace-pre overflow-x-auto">{`
┌─────────────────────────────────────────────────┐
│              pump.notdump.fun                    │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Launch   │  │ Monitor  │  │  AI Agent    │  │
│  │  UI       │  │ Dashboard│  │  (Autonomous)│  │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       │              │               │           │
│  ─────┴──────────────┴───────────────┴─────────  │
│                  Solana RPC                       │
│  ────────────────────────────────────────────── │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │     Anti-Rug Smart Contract (Anchor)       │  │
│  │                                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────┐ │  │
│  │  │ Vesting  │  │ Token    │  │ Claim   │ │  │
│  │  │ Schedule │  │ Mint     │  │ Logic   │ │  │
│  │  └──────────┘  └──────────┘  └─────────┘ │  │
│  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
`}</pre>
          </div>
        </section>

        {/* Smart Contract */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Smart Contract</h2>
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Program ID (Devnet)</h3>
              <code className="text-purple-400 font-mono text-sm break-all">D5HsjjMSrCJyEF1aUuionRsx7MXfKEFWtmSnAN3cQBvB</code>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Instructions</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <span className="text-green-400 font-mono font-bold">initialize_launch</span>
                  <p className="text-gray-400 mt-1">Creates a new token launch with vesting parameters. Sets creator, mint, total supply, vesting duration (3-12 months), and cliff period.</p>
                </li>
                <li>
                  <span className="text-green-400 font-mono font-bold">buy_tokens</span>
                  <p className="text-gray-400 mt-1">Purchase tokens from a launch. SOL is deposited into the program-owned liquidity pool. Bonding curve determines price.</p>
                </li>
                <li>
                  <span className="text-green-400 font-mono font-bold">claim_vested</span>
                  <p className="text-gray-400 mt-1">Creator claims unlocked tokens based on elapsed time. Linear vesting after cliff. On-chain math, no oracles needed.</p>
                </li>
                <li>
                  <span className="text-green-400 font-mono font-bold">emergency_pause</span>
                  <p className="text-gray-400 mt-1">DAO-governed pause mechanism. Requires multisig approval. Freezes all claims and new purchases.</p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Vesting Model</h3>
              <div className="text-gray-300 space-y-3">
                <p>Linear vesting with configurable cliff:</p>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-green-400">
                  <p>vested_amount = total_allocation * (time_elapsed - cliff) / (total_duration - cliff)</p>
                  <p className="text-gray-500 mt-2">// If time_elapsed &lt; cliff: vested_amount = 0</p>
                  <p className="text-gray-500">// If time_elapsed &gt;= total_duration: vested_amount = total_allocation</p>
                </div>
                <ul className="space-y-2 mt-4 text-gray-400">
                  <li className="flex items-start"><span className="text-purple-400 mr-2">*</span>Minimum vesting: 90 days</li>
                  <li className="flex items-start"><span className="text-purple-400 mr-2">*</span>Maximum vesting: 365 days</li>
                  <li className="flex items-start"><span className="text-purple-400 mr-2">*</span>Cliff: 25% of total duration (configurable)</li>
                  <li className="flex items-start"><span className="text-purple-400 mr-2">*</span>Creator allocation: Max 20% of total supply</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI Agent */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Autonomous AI Agent</h2>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-300 mb-4">
              The pump.notdump.fun agent runs 24/7, monitoring all launched tokens for suspicious activity:
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start"><span className="text-green-400 mr-2">&#10003;</span><strong className="text-white">Rug Detection:</strong> Monitors creator wallet activity, flags unusual transfer patterns</li>
              <li className="flex items-start"><span className="text-green-400 mr-2">&#10003;</span><strong className="text-white">Liquidity Guard:</strong> Tracks LP ratios, alerts on sudden drops</li>
              <li className="flex items-start"><span className="text-green-400 mr-2">&#10003;</span><strong className="text-white">Social Sentinel:</strong> Scans X/Twitter for FUD signals about launched tokens</li>
              <li className="flex items-start"><span className="text-green-400 mr-2">&#10003;</span><strong className="text-white">Auto-Reporter:</strong> Publishes real-time safety scores on the Monitor dashboard</li>
            </ul>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Roadmap</h2>
          <div className="space-y-4">
            {[
              { phase: 'Phase 1', title: 'Devnet Launch', status: 'LIVE', color: 'green', items: ['Smart contract deployed', 'Dashboard UI', 'Token launch flow', 'Waitlist collection'] },
              { phase: 'Phase 2', title: 'Mainnet Beta', status: 'Q1 2026', color: 'purple', items: ['Mainnet deployment', 'Wallet integration', 'First 10 token launches', 'AI agent monitoring v1'] },
              { phase: 'Phase 3', title: 'Scale', status: 'Q2 2026', color: 'pink', items: ['DAO governance', 'Cross-chain (Base, Monad)', 'Partner integrations', 'Revenue sharing for early adopters'] },
            ].map((p) => (
              <div key={p.phase} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${p.color}-400/20 text-${p.color}-400`}>{p.status}</span>
                  <h3 className="text-xl font-bold text-white">{p.phase}: {p.title}</h3>
                </div>
                <ul className="grid grid-cols-2 gap-2 text-gray-400 text-sm">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center"><span className={`text-${p.color}-400 mr-2`}>&#8226;</span>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Source Code</h2>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-300 mb-4">Open source. Fully auditable.</p>
            <div className="flex gap-4">
              <a href="https://github.com/Luij78/pumpnotdump" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-sm font-semibold text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                Smart Contract Repo
              </a>
              <a href="https://github.com/Luij78/pumpnotdump-frontend" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-sm font-semibold text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                Frontend Repo
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

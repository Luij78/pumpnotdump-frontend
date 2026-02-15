'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Token {
  name: string;
  symbol: string;
  address: string;
  safeVotes: number;
  rugVotes: number;
  totalVoters: number;
  rugScore: number;
  marketCap: string;
  launchDate: string;
}

const MOCK_TOKENS: Token[] = [
  { name: 'AgentAlpha', symbol: 'AALPHA', address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', safeVotes: 142, rugVotes: 8, totalVoters: 150, rugScore: 12, marketCap: '$2.3M', launchDate: '2026-02-14' },
  { name: 'DegenBot', symbol: 'DBOT', address: '9pRLkJTkNmyRf3NZa7mYM9dJPcWfvbiSbLFaFMKVr8wE', safeVotes: 23, rugVotes: 89, totalVoters: 112, rugScore: 87, marketCap: '$180K', launchDate: '2026-02-13' },
  { name: 'SwarmNet', symbol: 'SWARM', address: '4vMsoUT2BWatFweudnQM1xedRLfJgJ7hsWhPpE1YAYkR', safeVotes: 67, rugVotes: 33, totalVoters: 100, rugScore: 45, marketCap: '$890K', launchDate: '2026-02-12' },
  { name: 'NeuralDAO', symbol: 'NDAO', address: '3Fq2sWYuhkGsFwNYmSWGuXPxpNBwdJMSkCFSYKk3xNPz', safeVotes: 201, rugVotes: 4, totalVoters: 205, rugScore: 5, marketCap: '$5.1M', launchDate: '2026-02-10' },
  { name: 'PumpMaster', symbol: 'PMSTR', address: 'BRjpCHtyQLSedrjByFk7NnJcZJbAMR3q8PgPszp5pump', safeVotes: 5, rugVotes: 145, totalVoters: 150, rugScore: 96, marketCap: '$45K', launchDate: '2026-02-15' },
  { name: 'MemoryChain', symbol: 'MEMCH', address: '6YxXe9cNfLqJZCBetjksLHFnVz5iQfRJzk8mEJhVpump', safeVotes: 88, rugVotes: 12, totalVoters: 100, rugScore: 18, marketCap: '$1.2M', launchDate: '2026-02-11' },
];

function getRiskColor(score: number) {
  if (score <= 20) return 'text-green-400';
  if (score <= 50) return 'text-yellow-400';
  if (score <= 75) return 'text-orange-400';
  return 'text-red-400';
}

function getRiskLabel(score: number) {
  if (score <= 20) return 'LOW RISK';
  if (score <= 50) return 'MODERATE';
  if (score <= 75) return 'HIGH RISK';
  return 'EXTREME';
}

function getRiskBg(score: number) {
  if (score <= 20) return 'bg-green-500/10 border-green-500/30';
  if (score <= 50) return 'bg-yellow-500/10 border-yellow-500/30';
  if (score <= 75) return 'bg-orange-500/10 border-orange-500/30';
  return 'bg-red-500/10 border-red-500/30';
}

export default function VotePage() {
  const [tokens, setTokens] = useState(MOCK_TOKENS);
  const [voted, setVoted] = useState<Record<string, 'safe' | 'rug'>>({});
  const [filter, setFilter] = useState<'all' | 'safe' | 'danger'>('all');

  function vote(address: string, type: 'safe' | 'rug') {
    if (voted[address]) return;
    setVoted(prev => ({ ...prev, [address]: type }));
    setTokens(prev => prev.map(t => {
      if (t.address !== address) return t;
      const newSafe = t.safeVotes + (type === 'safe' ? 1 : 0);
      const newRug = t.rugVotes + (type === 'rug' ? 1 : 0);
      const newTotal = t.totalVoters + 1;
      return { ...t, safeVotes: newSafe, rugVotes: newRug, totalVoters: newTotal, rugScore: Math.round((newRug / newTotal) * 100) };
    }));
  }

  const filtered = tokens.filter(t => {
    if (filter === 'safe') return t.rugScore <= 30;
    if (filter === 'danger') return t.rugScore > 60;
    return true;
  }).sort((a, b) => filter === 'danger' ? b.rugScore - a.rugScore : a.rugScore - b.rugScore);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <nav className="border-b border-purple-500/20 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            pump.notdump.fun
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/scanner" className="text-gray-400 hover:text-white transition">Scanner</Link>
            <Link href="/analytics" className="text-gray-400 hover:text-white transition">Analytics</Link>
            <Link href="/vote" className="text-purple-400 font-semibold">Community Vote</Link>
            <Link href="/leaderboard" className="text-gray-400 hover:text-white transition">Leaderboard</Link>
            <Link href="/docs" className="text-gray-400 hover:text-white transition">Docs</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Community Rug Vote</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Crowdsourced intelligence. Vote on whether AI agent tokens are safe or suspicious.
            The community&apos;s collective wisdom protects everyone.
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
              {tokens.reduce((s, t) => s + t.totalVoters, 0).toLocaleString()} total votes
            </span>
            <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-sm">
              {tokens.filter(t => t.rugScore <= 30).length} safe tokens
            </span>
            <span className="px-3 py-1 bg-red-500/20 rounded-full text-red-300 text-sm">
              {tokens.filter(t => t.rugScore > 60).length} flagged tokens
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          {(['all', 'safe', 'danger'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Tokens' : f === 'safe' ? 'Safe Only' : 'Flagged'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(token => (
            <div
              key={token.address}
              className={`border rounded-xl p-6 ${getRiskBg(token.rugScore)} transition hover:scale-[1.01]`}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{token.name}</h3>
                    <span className="text-gray-500 text-sm">${token.symbol}</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${getRiskBg(token.rugScore)} ${getRiskColor(token.rugScore)}`}>
                      {getRiskLabel(token.rugScore)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs font-mono">{token.address.slice(0, 8)}...{token.address.slice(-6)}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-400">
                    <span>MCap: {token.marketCap}</span>
                    <span>Launched: {token.launchDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getRiskColor(token.rugScore)}`}>{token.rugScore}%</div>
                    <div className="text-xs text-gray-500">Rug Score</div>
                  </div>

                  <div className="w-32 bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                      style={{ width: `${100 - token.rugScore}%` }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => vote(token.address, 'safe')}
                      disabled={!!voted[token.address]}
                      className={`flex flex-col items-center px-4 py-2 rounded-lg transition ${
                        voted[token.address] === 'safe'
                          ? 'bg-green-600 text-white'
                          : voted[token.address]
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-800 text-green-400 hover:bg-green-600 hover:text-white'
                      }`}
                    >
                      <span className="text-lg">&#x2714;</span>
                      <span className="text-xs">{token.safeVotes}</span>
                    </button>
                    <button
                      onClick={() => vote(token.address, 'rug')}
                      disabled={!!voted[token.address]}
                      className={`flex flex-col items-center px-4 py-2 rounded-lg transition ${
                        voted[token.address] === 'rug'
                          ? 'bg-red-600 text-white'
                          : voted[token.address]
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-800 text-red-400 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      <span className="text-lg">&#x26A0;</span>
                      <span className="text-xs">{token.rugVotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">How Community Voting Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-purple-400 text-2xl mb-2">1</div>
                <h3 className="text-white font-semibold mb-1">Scan</h3>
                <p className="text-gray-400 text-sm">Our AI agent scans new tokens for on-chain red flags automatically.</p>
              </div>
              <div>
                <div className="text-purple-400 text-2xl mb-2">2</div>
                <h3 className="text-white font-semibold mb-1">Vote</h3>
                <p className="text-gray-400 text-sm">Community members vote safe or rug based on their own research.</p>
              </div>
              <div>
                <div className="text-purple-400 text-2xl mb-2">3</div>
                <h3 className="text-white font-semibold mb-1">Protect</h3>
                <p className="text-gray-400 text-sm">High rug scores trigger alerts. Collective wisdom prevents losses.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  symbol: string;
  address: string;
  safetyScore: number;
  communityVotes: number;
  vestingProgress: number;
  marketCap: string;
  holders: number;
  age: string;
  trend: 'up' | 'down' | 'stable';
}

const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'NeuralDAO', symbol: 'NDAO', address: '3Fq2sWYuhkGsFwNY...', safetyScore: 95, communityVotes: 205, vestingProgress: 72, marketCap: '$5.1M', holders: 3420, age: '5d', trend: 'up' },
  { rank: 2, name: 'AgentAlpha', symbol: 'AALPHA', address: '7xKXtg2CW87d97TJ...', safetyScore: 88, communityVotes: 150, vestingProgress: 45, marketCap: '$2.3M', holders: 1890, age: '1d', trend: 'up' },
  { rank: 3, name: 'MemoryChain', symbol: 'MEMCH', address: '6YxXe9cNfLqJZCBe...', safetyScore: 82, communityVotes: 100, vestingProgress: 60, marketCap: '$1.2M', holders: 980, age: '4d', trend: 'stable' },
  { rank: 4, name: 'SwarmNet', symbol: 'SWARM', address: '4vMsoUT2BWatFweu...', safetyScore: 55, communityVotes: 100, vestingProgress: 30, marketCap: '$890K', holders: 650, age: '3d', trend: 'down' },
  { rank: 5, name: 'DegenBot', symbol: 'DBOT', address: '9pRLkJTkNmyRf3NZ...', safetyScore: 13, communityVotes: 112, vestingProgress: 10, marketCap: '$180K', holders: 2100, age: '2d', trend: 'down' },
  { rank: 6, name: 'PumpMaster', symbol: 'PMSTR', address: 'BRjpCHtyQLSedrdj...', safetyScore: 4, communityVotes: 150, vestingProgress: 0, marketCap: '$45K', holders: 890, age: '0d', trend: 'down' },
];

function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  if (score >= 25) return 'text-orange-400';
  return 'text-red-400';
}

function getMedalColor(rank: number) {
  if (rank === 1) return 'from-yellow-400 to-yellow-600';
  if (rank === 2) return 'from-gray-300 to-gray-500';
  if (rank === 3) return 'from-orange-400 to-orange-600';
  return 'from-gray-600 to-gray-700';
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <span className="text-green-400">&#9650;</span>;
  if (trend === 'down') return <span className="text-red-400">&#9660;</span>;
  return <span className="text-gray-500">&#9644;</span>;
}

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<'safety' | 'votes' | 'mcap'>('safety');

  const sorted = [...LEADERBOARD].sort((a, b) => {
    if (sortBy === 'votes') return b.communityVotes - a.communityVotes;
    if (sortBy === 'mcap') return parseFloat(b.marketCap.replace(/[$MK]/g, '')) - parseFloat(a.marketCap.replace(/[$MK]/g, ''));
    return b.safetyScore - a.safetyScore;
  });

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
            <Link href="/vote" className="text-gray-400 hover:text-white transition">Community Vote</Link>
            <Link href="/leaderboard" className="text-purple-400 font-semibold">Leaderboard</Link>
            <Link href="/docs" className="text-gray-400 hover:text-white transition">Docs</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Safety Leaderboard</h1>
          <p className="text-gray-400 text-lg">
            Top AI agent tokens ranked by safety score. AI analysis + community votes = trust.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {sorted.slice(0, 3).map((token, i) => (
            <div key={token.address} className={`${i === 0 ? 'order-2' : i === 1 ? 'order-1 mt-8' : 'order-3 mt-8'}`}>
              <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 text-center">
                <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-b ${getMedalColor(i + 1)} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                  {i + 1}
                </div>
                <h3 className="text-white font-bold text-lg">{token.name}</h3>
                <p className="text-gray-500 text-sm">${token.symbol}</p>
                <div className={`text-3xl font-bold mt-3 ${getScoreColor(token.safetyScore)}`}>
                  {token.safetyScore}
                </div>
                <p className="text-gray-500 text-xs mt-1">Safety Score</p>
                <div className="mt-3 text-sm text-gray-400">
                  <span>{token.marketCap}</span> &middot; <span>{token.holders.toLocaleString()} holders</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 mb-6">
          {([['safety', 'Safety Score'], ['votes', 'Most Voted'], ['mcap', 'Market Cap']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                sortBy === key ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Full Table */}
        <div className="bg-gray-800/30 border border-purple-500/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-500/10 text-gray-500 text-sm">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Token</th>
                <th className="px-4 py-3 text-center">Safety</th>
                <th className="px-4 py-3 text-center">Votes</th>
                <th className="px-4 py-3 text-center">Vesting</th>
                <th className="px-4 py-3 text-right">Market Cap</th>
                <th className="px-4 py-3 text-right">Holders</th>
                <th className="px-4 py-3 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((token, i) => (
                <tr key={token.address} className="border-b border-purple-500/5 hover:bg-purple-500/5 transition">
                  <td className="px-4 py-4 text-gray-500 font-mono">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div>
                      <span className="text-white font-semibold">{token.name}</span>
                      <span className="text-gray-500 text-sm ml-2">${token.symbol}</span>
                    </div>
                    <div className="text-gray-600 text-xs font-mono mt-0.5">{token.address}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-xl font-bold ${getScoreColor(token.safetyScore)}`}>{token.safetyScore}</span>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-400">{token.communityVotes}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${token.vestingProgress}%` }} />
                      </div>
                      <span className="text-gray-500 text-xs">{token.vestingProgress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-white">{token.marketCap}</td>
                  <td className="px-4 py-4 text-right text-gray-400">{token.holders.toLocaleString()}</td>
                  <td className="px-4 py-4 text-center"><TrendIcon trend={token.trend} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 bg-gray-800/30 border border-purple-500/10 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">How Safety Scores Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-green-400 font-bold text-lg mb-1">On-Chain Analysis</div>
              <p className="text-gray-400 text-sm">Liquidity lock status, holder distribution, contract verification, and mint authority checks.</p>
            </div>
            <div>
              <div className="text-blue-400 font-bold text-lg mb-1">Community Votes</div>
              <p className="text-gray-400 text-sm">Crowdsourced intelligence from community members who research and verify each token.</p>
            </div>
            <div>
              <div className="text-purple-400 font-bold text-lg mb-1">Vesting Progress</div>
              <p className="text-gray-400 text-sm">Tokens with active vesting schedules score higher. Locked liquidity = commitment.</p>
            </div>
            <div>
              <div className="text-yellow-400 font-bold text-lg mb-1">AI Agent Scan</div>
              <p className="text-gray-400 text-sm">Our autonomous agent continuously monitors social signals, team activity, and market behavior.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock token data
const mockTokens = [
  {
    address: 'GxYz123ABC456DEF789GHI',
    name: 'AlphaTrader AI',
    symbol: 'ALPHA',
    agentType: 'trading',
    totalSupply: 1000000000,
    creatorAllocation: 10,
    vestingMonths: 6,
    launchedAt: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
    marketCap: 2500000,
    volume24h: 145000,
    holders: 1247,
    price: 0.0025,
    change24h: 12.5,
    safetyScore: 95,
    twitter: '@alphatraderai',
  },
  {
    address: 'HaBC789XYZ321FGH654IJK',
    name: 'ContentBot Pro',
    symbol: 'CONTENT',
    agentType: 'content',
    totalSupply: 500000000,
    creatorAllocation: 15,
    vestingMonths: 12,
    launchedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    marketCap: 890000,
    volume24h: 52000,
    holders: 623,
    price: 0.00178,
    change24h: -3.2,
    safetyScore: 98,
    twitter: '@contentbotpro',
  },
  {
    address: 'JkLM456NOP789QRS012TUV',
    name: 'GameMaster AI',
    symbol: 'GAME',
    agentType: 'gaming',
    totalSupply: 2000000000,
    creatorAllocation: 8,
    vestingMonths: 6,
    launchedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    marketCap: 1200000,
    volume24h: 87000,
    holders: 891,
    price: 0.0006,
    change24h: 28.7,
    safetyScore: 92,
    twitter: '@gamemasterai',
  },
  {
    address: 'WxYZ890DEF345GHI678JKL',
    name: 'ResearchHub Agent',
    symbol: 'RSCH',
    agentType: 'research',
    totalSupply: 750000000,
    creatorAllocation: 12,
    vestingMonths: 9,
    launchedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    marketCap: 450000,
    volume24h: 31000,
    holders: 412,
    price: 0.0006,
    change24h: 5.8,
    safetyScore: 96,
    twitter: '@researchhubai',
  },
];

type SortKey = 'marketCap' | 'volume24h' | 'holders' | 'change24h' | 'safetyScore' | 'launchedAt';

export default function MonitorPage() {
  const [sortBy, setSortBy] = useState<SortKey>('marketCap');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredTokens = filterType === 'all' 
    ? mockTokens 
    : mockTokens.filter(t => t.agentType === filterType);

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    if (sortBy === 'launchedAt') return b.launchedAt - a.launchedAt;
    return (b[sortBy] as number) - (a[sortBy] as number);
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const getTimeAgo = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / (24 * 60 * 60 * 1000));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const getSafetyColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSafetyBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
    if (score >= 75) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 px-6 py-20">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto mb-12">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Token Monitor</h1>
          <p className="text-xl text-gray-400">Track all anti-rug AI agent tokens in real-time</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Total Tokens</div>
            <div className="text-3xl font-bold text-white">{mockTokens.length}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Combined Market Cap</div>
            <div className="text-3xl font-bold text-purple-400">
              {formatNumber(mockTokens.reduce((sum, t) => sum + t.marketCap, 0))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">24h Volume</div>
            <div className="text-3xl font-bold text-pink-400">
              {formatNumber(mockTokens.reduce((sum, t) => sum + t.volume24h, 0))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Total Holders</div>
            <div className="text-3xl font-bold text-green-400">
              {mockTokens.reduce((sum, t) => sum + t.holders, 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="text-gray-300 font-semibold">Filter:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Types</option>
                <option value="trading">Trading</option>
                <option value="content">Content</option>
                <option value="gaming">Gaming</option>
                <option value="research">Research</option>
                <option value="social">Social</option>
              </select>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="text-gray-300 font-semibold">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="marketCap">Market Cap</option>
                <option value="volume24h">24h Volume</option>
                <option value="holders">Holders</option>
                <option value="change24h">24h Change</option>
                <option value="safetyScore">Safety Score</option>
                <option value="launchedAt">Recently Launched</option>
              </select>
            </div>
          </div>
        </div>

        {/* Token Grid */}
        <div className="grid gap-6">
          {sortedTokens.map((token) => (
            <Link 
              key={token.address}
              href={`/token/${token.address}`}
              className="block bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Token Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                      {token.symbol.substring(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{token.name}</h3>
                        <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-400 rounded-full uppercase">
                          ${token.symbol}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full capitalize">
                          {token.agentType}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="font-mono">{token.address.substring(0, 8)}...{token.address.slice(-6)}</span>
                        <span>•</span>
                        <span>{getTimeAgo(token.launchedAt)}</span>
                        {token.twitter && (
                          <>
                            <span>•</span>
                            <span className="text-blue-400">{token.twitter}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Vesting Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <span className="text-gray-400">Vesting: <span className="text-purple-400 font-semibold">{token.vestingMonths} months</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                      <span className="text-gray-400">Creator: <span className="text-pink-400 font-semibold">{token.creatorAllocation}% locked</span></span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Market Cap</div>
                    <div className="text-lg font-semibold text-white">{formatNumber(token.marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">24h Volume</div>
                    <div className="text-lg font-semibold text-purple-400">{formatNumber(token.volume24h)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Holders</div>
                    <div className="text-lg font-semibold text-pink-400">{token.holders.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">24h Change</div>
                    <div className={`text-lg font-semibold ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Safety Score */}
                <div className={`px-6 py-4 rounded-lg border ${getSafetyBg(token.safetyScore)}`}>
                  <div className="text-xs text-gray-400 mb-1 text-center">Safety Score</div>
                  <div className={`text-3xl font-bold text-center ${getSafetyColor(token.safetyScore)}`}>
                    {token.safetyScore}
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-1">/ 100</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Launch CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Launch Your Own Token</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Create an AI agent token with built-in rug protection. Vesting enforced at the smart contract level.
          </p>
          <Link
            href="/launch"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50"
          >
            Launch Token
          </Link>
        </div>
      </div>
    </div>
  );
}

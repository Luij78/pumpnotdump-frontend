'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function TokenDetailPage() {
  const params = useParams();
  const address = params.address as string;

  // Mock token data (would fetch from blockchain)
  const token = {
    address: address,
    name: 'AlphaTrader AI',
    symbol: 'ALPHA',
    agentType: 'trading',
    description: 'Autonomous trading agent powered by advanced machine learning algorithms. Executes high-frequency trades across multiple DEXs on Solana.',
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
    website: 'https://alphatrader.ai',
    creatorWallet: '9LxrENgXEaidARTVyifUU7uuB3TfbwYXGZ99ySsPax9X',
    totalLocked: 100000000,
    totalClaimed: 25000000,
    nextUnlock: Date.now() + 15 * 24 * 60 * 60 * 1000,
    monthlyUnlock: 16666667,
  };

  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = async () => {
    setClaiming(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setClaimed(true);
    setClaiming(false);
  };

  const vestingProgress = (token.totalClaimed / token.totalLocked) * 100;
  const daysElapsed = Math.floor((Date.now() - token.launchedAt) / (24 * 60 * 60 * 1000));
  const totalDays = token.vestingMonths * 30;
  const timeProgress = (daysElapsed / totalDays) * 100;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  const getTimeAgo = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / (24 * 60 * 60 * 1000));
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 px-6 py-20">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto mb-12">
        <Link href="/monitor" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Monitor
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl font-bold text-white flex-shrink-0">
              {token.symbol.substring(0, 2)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold text-white">{token.name}</h1>
                <span className="px-4 py-1 text-sm font-semibold bg-purple-500/20 text-purple-400 rounded-full uppercase">
                  ${token.symbol}
                </span>
                <span className="px-4 py-1 text-sm font-semibold bg-blue-500/20 text-blue-400 rounded-full capitalize">
                  {token.agentType}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4 max-w-3xl">{token.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-400 font-mono">{token.address.substring(0, 8)}...{token.address.slice(-6)}</span>
                  <button className="text-purple-400 hover:text-purple-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                {token.twitter && (
                  <a href={`https://twitter.com/${token.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    {token.twitter}
                  </a>
                )}
                
                {token.website && (
                  <a href={token.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* Safety Score */}
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl px-8 py-6 text-center flex-shrink-0">
              <div className="text-sm text-gray-400 mb-1">Safety Score</div>
              <div className="text-5xl font-bold text-green-400 mb-1">{token.safetyScore}</div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market Stats */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Market Stats</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Price</div>
                  <div className="text-2xl font-bold text-white">${token.price.toFixed(4)}</div>
                  <div className={`text-sm font-semibold ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}% (24h)
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Market Cap</div>
                  <div className="text-2xl font-bold text-purple-400">{formatCurrency(token.marketCap)}</div>
                  <div className="text-sm text-gray-500">Rank #127</div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">24h Volume</div>
                  <div className="text-2xl font-bold text-pink-400">{formatCurrency(token.volume24h)}</div>
                  <div className="text-sm text-gray-500">{((token.volume24h / token.marketCap) * 100).toFixed(1)}% of MCap</div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Holders</div>
                  <div className="text-2xl font-bold text-green-400">{token.holders.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Growing</div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Total Supply</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(token.totalSupply)}</div>
                  <div className="text-sm text-gray-500">Fixed</div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Launched</div>
                  <div className="text-2xl font-bold text-white">{daysElapsed} days ago</div>
                  <div className="text-sm text-gray-500">{new Date(token.launchedAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {/* Vesting Schedule */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Vesting Schedule</h2>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Vesting Progress</span>
                  <span className="text-white font-semibold">{vestingProgress.toFixed(1)}%</span>
                </div>
                <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-purple-500/30">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                    style={{ width: `${vestingProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                  <span>Day 0</span>
                  <span>Day {totalDays}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Total Locked</div>
                  <div className="text-xl font-bold text-purple-400">{formatNumber(token.totalLocked)} ${token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.creatorAllocation}% of supply</div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Total Claimed</div>
                  <div className="text-xl font-bold text-green-400">{formatNumber(token.totalClaimed)} ${token.symbol}</div>
                  <div className="text-sm text-gray-500">{vestingProgress.toFixed(1)}% unlocked</div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Remaining Locked</div>
                  <div className="text-xl font-bold text-pink-400">{formatNumber(token.totalLocked - token.totalClaimed)} ${token.symbol}</div>
                  <div className="text-sm text-gray-500">{(100 - vestingProgress).toFixed(1)}% remaining</div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Next Unlock</div>
                  <div className="text-xl font-bold text-white">{formatNumber(token.monthlyUnlock)} ${token.symbol}</div>
                  <div className="text-sm text-gray-500">in {getTimeAgo(token.nextUnlock)}</div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-purple-400 font-semibold mb-1">Linear Vesting</div>
                    <div className="text-gray-400 text-sm">
                      Tokens unlock linearly over {token.vestingMonths} months. Approximately {formatNumber(token.monthlyUnlock)} ${token.symbol} unlocks every 30 days.
                      No emergency withdrawals possible - enforced by smart contract.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-8">
            {/* Creator Dashboard */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Creator Dashboard</h3>
              
              <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20 mb-4">
                <div className="text-sm text-gray-400 mb-1">Available to Claim</div>
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {formatNumber(claimed ? 0 : token.monthlyUnlock)} ${token.symbol}
                </div>
                <div className="text-sm text-gray-500">≈ ${(token.monthlyUnlock * token.price).toFixed(2)}</div>
              </div>

              {!claimed ? (
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {claiming ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Claiming...
                    </span>
                  ) : (
                    'Claim Vested Tokens'
                  )}
                </button>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                  <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="text-green-400 font-semibold">Claimed Successfully!</div>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-500 text-center">
                Next unlock in {getTimeAgo(token.nextUnlock)}
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-gradient-to-br from-green-900/20 to-purple-900/20 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Safety Features</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-white font-semibold">On-Chain Vesting</div>
                    <div className="text-sm text-gray-400">100% enforced by smart contract</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-white font-semibold">No Backdoors</div>
                    <div className="text-sm text-gray-400">No emergency withdrawals possible</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-white font-semibold">Transparent</div>
                    <div className="text-sm text-gray-400">All claims visible on-chain</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-white font-semibold">Linear Release</div>
                    <div className="text-sm text-gray-400">Gradual unlock over {token.vestingMonths} months</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 text-left font-semibold text-white bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg transition-all">
                  Trade on Raydium →
                </button>
                <button className="w-full px-4 py-3 text-left font-semibold text-white bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 rounded-lg transition-all">
                  Add Liquidity →
                </button>
                <button className="w-full px-4 py-3 text-left font-semibold text-white bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg transition-all">
                  View on Explorer →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

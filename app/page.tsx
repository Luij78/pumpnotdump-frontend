'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [count, setCount] = useState(0);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setCount(data.count);
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Top Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              pump.notdump.fun
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/scanner" className="text-gray-300 hover:text-white transition-colors font-semibold">
                Scanner
              </Link>
              <Link href="/vote" className="text-gray-300 hover:text-white transition-colors font-semibold">
                Vote
              </Link>
              <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors font-semibold">
                Leaderboard
              </Link>
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors font-semibold">
                Docs
              </Link>
              <Link href="/launch" className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                Launch Token
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
              Building on Solana Devnet
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-green-400">
            pump.notdump.fun
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-8">
            The Anti-Rug Launchpad for AI Agent Tokens
          </p>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Launch AI agent tokens with built-in vesting. No more rug pulls. Just fair, transparent token launches on Solana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/launch" className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 text-center">
              Launch Your Token
            </Link>
            <Link href="/monitor" className="px-8 py-4 text-lg font-semibold text-white border-2 border-purple-500 rounded-lg hover:bg-purple-500/10 transition-all text-center">
              Browse Tokens →
            </Link>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="px-6 py-20 lg:px-8 bg-gray-900/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem */}
            <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-8">
              <div className="w-12 h-12 mb-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">The Problem</h3>
              <p className="text-gray-300 mb-4">
                AI agent token launches are plagued by rug pulls. Creators dump their holdings immediately after launch, leaving investors holding worthless tokens.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Instant liquidity exits by creators</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Zero accountability or skin in the game</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Destroyed trust in AI agent tokens</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-green-900/10 border border-green-500/20 rounded-2xl p-8">
              <div className="w-12 h-12 mb-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">The Solution</h3>
              <p className="text-gray-300 mb-4">
                Mandatory vesting schedules enforced at the smart contract level. Creators can't dump because their tokens are locked and released gradually.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Time-locked vesting (3-12 months)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Transparent on-chain enforcement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Aligned incentives for long-term success</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center text-white mb-4">How It Works</h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Three simple steps to launch your AI agent token with built-in rug protection
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 h-full">
                <div className="w-16 h-16 mb-6 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Launch</h3>
                <p className="text-gray-300">
                  Create your AI agent token with custom parameters. Set your vesting schedule (3-12 months) and initial distribution.
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-2xl p-8 h-full">
                <div className="w-16 h-16 mb-6 rounded-full bg-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-pink-400 mb-4">Vest</h3>
                <p className="text-gray-300">
                  Creator tokens are automatically locked in our Solana smart contract. No backdoors, no emergency withdrawals.
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-green-900/30 to-purple-900/30 border border-green-500/30 rounded-2xl p-8 h-full">
              <div className="w-16 h-16 mb-6 rounded-full bg-green-600 flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-4">Claim</h3>
              <p className="text-gray-300">
                Tokens unlock gradually over time. Creators claim only what's vested. Investors get confidence. Everyone wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Credibility */}
      <section className="px-6 py-20 lg:px-8 bg-gray-900/50">
        <div className="mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Built on Solana</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">Devnet</div>
                <div className="text-gray-400">Current Status</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
                <div className="text-gray-400">On-Chain</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">0</div>
                <div className="text-gray-400">Rug Pulls Possible</div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-6 border border-purple-500/20">
              <div className="text-sm text-gray-500 mb-2 font-mono">Solana Program ID (Devnet)</div>
              <div className="text-purple-400 font-mono text-sm break-all">
                D5HsjjMSrCJyEF1aUuionRsx7MXfKEFWtmSnAN3cQBvB
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Launch Without the Rug?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Be the first to know when we go live. Join the waitlist for early access.
          </p>
          
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8">
            {status === 'success' ? (
              <div className="text-center">
                <p className="text-green-400 text-xl font-semibold mb-2">You're in! #{count} on the waitlist.</p>
                <p className="text-gray-400">We'll notify you when we go live on mainnet.</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-6 py-4 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            )}
            {status === 'error' && <p className="text-red-400 text-sm mt-2">Something went wrong. Try again.</p>}
            <p className="text-sm text-gray-500 mt-4">
              No spam. Just launch updates and early access.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 lg:px-8 border-t border-gray-800">
        <div className="mx-auto max-w-5xl text-center text-gray-500">
          <p className="mb-4">pump.notdump.fun — The Anti-Rug Launchpad</p>
          <p className="text-sm">Built with 💜 on Solana</p>
        </div>
      </footer>
    </div>
  );
}

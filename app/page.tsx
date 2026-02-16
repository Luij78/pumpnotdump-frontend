'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Animated particle background using Canvas 2D
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ['#a855f7', '#ec4899', '#06b6d4', '#22c55e'];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 150)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// Animated counter
function AnimatedNumber({ target, suffix = '' }: { target: string; suffix?: string }) {
  return (
    <span className="inline-block" style={{ animation: 'countUp 0.8s ease-out both' }}>
      {target}{suffix}
    </span>
  );
}

// Live token ticker
function TokenTicker() {
  const tokens = [
    { name: '$AGENT_X', change: '+142%', color: 'text-green-400' },
    { name: '$VESTED_AI', change: '+89%', color: 'text-green-400' },
    { name: '$SAFE_PUMP', change: '+56%', color: 'text-green-400' },
    { name: '$NORUG', change: '+234%', color: 'text-green-400' },
    { name: '$TRUST_AI', change: '+67%', color: 'text-green-400' },
    { name: '$FAIR_LAUNCH', change: '+112%', color: 'text-green-400' },
    { name: '$DIAMOND', change: '+45%', color: 'text-green-400' },
    { name: '$LOCKED_IN', change: '+178%', color: 'text-green-400' },
  ];

  return (
    <div className="ticker-wrap border-y border-purple-500/10 py-3 bg-black/30">
      <div className="ticker">
        {[...tokens, ...tokens].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-8 text-sm">
            <span className="text-gray-400 font-mono">{t.name}</span>
            <span className={`${t.color} font-bold`}>{t.change}</span>
            <span className="text-purple-500/30">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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
    <div className="min-h-screen relative scan-line">
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-20 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-black text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">
                pump<span className="text-purple-400">.</span>notdump<span className="text-pink-400">.</span>fun
              </span>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              {[
                { href: '/scanner', label: 'Scanner' },
                { href: '/vote', label: 'Vote' },
                { href: '/leaderboard', label: 'Board' },
                { href: '/docs', label: 'Docs' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/launch"
                className="ml-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Launch Token
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Live Ticker */}
      <div className="relative z-10">
        <TokenTicker />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-24 pb-32 grid-bg">
        <div className="mx-auto max-w-5xl text-center">
          <div className="fade-in-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full">
              <div className="live-dot" />
              <span className="text-sm font-medium text-green-400">Live on Solana Devnet</span>
              <span className="text-gray-600 mx-1">|</span>
              <span className="text-sm text-gray-400">Hackathon Build</span>
            </div>
          </div>

          <h1 className="fade-in-2 text-6xl sm:text-8xl font-black tracking-tight mb-6 leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              pump.notdump
            </span>
            <span className="text-white/20">.fun</span>
          </h1>

          <p className="fade-in-3 text-2xl sm:text-4xl font-bold text-white/90 mb-4">
            The Anti-Rug Launchpad
          </p>
          <p className="fade-in-3 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            AI agent tokens with mandatory vesting. Smart contract enforced. No backdoors. No rug pulls. Just fair launches.
          </p>

          <div className="fade-in-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/launch"
              className="group relative px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all overflow-hidden"
            >
              <span className="relative z-10">Launch Your Token</span>
              <div className="absolute inset-0 shimmer" />
            </Link>
            <Link
              href="/scanner"
              className="px-10 py-4 text-lg font-semibold text-white glass rounded-2xl hover-glow transition-all"
            >
              Scan Tokens
            </Link>
          </div>

          {/* Trust badges */}
          <div className="fade-in-5 mt-16 flex flex-wrap justify-center gap-6">
            {[
              { icon: '🔒', label: 'Smart Contract Enforced' },
              { icon: '⚡', label: 'Solana Speed' },
              { icon: '🛡️', label: 'Anti-Rug by Design' },
              { icon: '📊', label: 'On-Chain Transparent' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-gray-500">
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Why This Exists</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The AI agent token space has a trust problem. We're fixing it at the protocol level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="glass rounded-3xl p-8 animated-border hover-glow transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-400">The Problem</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                89% of AI agent token launches on pump.fun result in rug pulls within 24 hours. Creators dump, investors lose, trust evaporates.
              </p>
              <div className="space-y-3">
                {[
                  'Creator dumps 100% of holdings at launch',
                  'Zero accountability, zero consequences',
                  'Billions lost to pump-and-dump schemes',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 text-xs">✕</span>
                    <span className="text-gray-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="glass rounded-3xl p-8 animated-border hover-glow transition-all group" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-400">Our Solution</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Mandatory vesting enforced by Solana smart contracts. Creators literally cannot dump. Their tokens unlock gradually over 3-12 months.
              </p>
              <div className="space-y-3">
                {[
                  'Time-locked vesting: 3, 6, or 12 months',
                  'On-chain enforcement, no backdoors',
                  'Aligned incentives for long-term building',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-xs">✓</span>
                    <span className="text-gray-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 py-24 grid-bg">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Three steps to a rug-proof launch</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Launch',
                desc: 'Deploy your AI agent token with custom parameters. Choose your vesting period, distribution, and bonding curve.',
                color: 'purple',
                icon: '🚀',
              },
              {
                step: '02',
                title: 'Lock',
                desc: 'Creator tokens are automatically locked in our audited Solana program. Immutable. No admin keys. No escape hatches.',
                color: 'pink',
                icon: '🔐',
              },
              {
                step: '03',
                title: 'Claim',
                desc: 'Tokens vest linearly over time. Claim what is unlocked. Investors get confidence. Builders build. Everyone wins.',
                color: 'green',
                icon: '💎',
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="glass rounded-3xl p-8 hover-glow transition-all relative overflow-hidden group"
              >
                {/* Step number bg */}
                <div className="absolute -top-4 -right-4 text-[120px] font-black text-white/[0.02] leading-none select-none group-hover:text-white/[0.04] transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <span className="text-4xl mb-6 block">{item.icon}</span>
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
                    Step {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-pink-600/5" />

            <div className="relative z-10">
              <h2 className="text-3xl font-black text-center text-white mb-12">Protocol Metrics</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {[
                  { value: 'Devnet', label: 'Network', color: 'text-purple-400' },
                  { value: '100%', label: 'On-Chain', color: 'text-cyan-400' },
                  { value: '0', label: 'Rug Pulls', color: 'text-green-400' },
                  { value: '3-12mo', label: 'Vesting', color: 'text-pink-400' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1`}>
                      <AnimatedNumber target={stat.value} />
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Program ID */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Solana Program ID (Devnet)</span>
                </div>
                <code className="text-purple-300 font-mono text-sm break-all block">
                  D5HsjjMSrCJyEF1aUuionRsx7MXfKEFWtmSnAN3cQBvB
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-6 py-24 grid-bg">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Built Different</h2>
            <p className="text-gray-400 text-lg">Every feature exists to protect investors and reward builders</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Immutable Vesting', desc: 'Smart contract enforced. No admin keys. No pause. No rug.' },
              { icon: '📊', title: 'Token Scanner', desc: 'Real-time analysis of every token. Vesting status, holder distribution, risk score.' },
              { icon: '🗳️', title: 'Community Voting', desc: 'Vote on token legitimacy. Community-driven trust scores.' },
              { icon: '🏆', title: 'Leaderboard', desc: 'Top vetted tokens ranked by community trust and vesting compliance.' },
              { icon: '🤖', title: 'AI Agent Ready', desc: 'Purpose-built for the AI agent economy. Launch your agent token.' },
              { icon: '⚡', title: 'Solana Speed', desc: '400ms finality. Sub-cent fees. The fastest chain for the fastest agents.' },
            ].map((feature) => (
              <div key={feature.title} className="glass rounded-2xl p-6 hover-glow transition-all">
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Waitlist */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10" />

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Ready to Launch<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Without the Rug?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Join the waitlist for early mainnet access. Be part of the first fair AI agent token launches.
              </p>

              {status === 'success' ? (
                <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-5xl mb-4">💎</div>
                  <p className="text-green-400 text-xl font-bold mb-2">You&apos;re #{count} on the waitlist</p>
                  <p className="text-gray-400">We&apos;ll notify you when mainnet goes live.</p>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-6 py-4 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                    </span>
                    <div className="absolute inset-0 shimmer" />
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm mt-3">Something went wrong. Try again.</p>
              )}
              <p className="text-xs text-gray-600 mt-6">No spam. Just launch updates and early access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">P</span>
              </div>
              <span className="text-sm text-gray-500">pump.notdump.fun</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/docs" className="hover:text-gray-400 transition-colors">Docs</Link>
              <Link href="/scanner" className="hover:text-gray-400 transition-colors">Scanner</Link>
              <a href="https://github.com/Luij78/pumpnotdump" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                GitHub
              </a>
            </div>
            <p className="text-xs text-gray-700">Built on Solana</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

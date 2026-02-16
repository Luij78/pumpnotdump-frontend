'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Advanced gradient mesh background using Canvas 2D
function GradientMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Gradient orbs
    const orbs = [
      { x: 0.2, y: 0.3, radius: 400, color: [168, 85, 247], speed: 0.0003 },
      { x: 0.8, y: 0.4, radius: 350, color: [236, 72, 153], speed: 0.0004 },
      { x: 0.5, y: 0.7, radius: 300, color: [6, 182, 212], speed: 0.00035 },
      { x: 0.1, y: 0.8, radius: 280, color: [34, 197, 94], speed: 0.00045 },
    ];

    function draw() {
      ctx!.fillStyle = '#030014';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      orbs.forEach((orb, i) => {
        const x = orb.x * canvas!.width + Math.sin(time * orb.speed + i) * 100;
        const y = orb.y * canvas!.height + Math.cos(time * orb.speed + i) * 80;

        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, orb.radius);
        gradient.addColorStop(0, `rgba(${orb.color.join(',')}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${orb.color.join(',')}, 0.05)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      });

      time++;
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

// Floating particles system
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.1,
        color: ['#a855f7', '#ec4899', '#06b6d4', '#22c55e'][Math.floor(Math.random() * 4)],
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - dist / 150)})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
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
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
}

// Animated counter with easing
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            countRef.current = Math.floor(eased * end);
            setCount(countRef.current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={elementRef} className="tabular-nums">
      {count}{suffix}
    </div>
  );
}

// Live token ticker
function TokenTicker() {
  const tokens = [
    { name: '$AGENT_X', change: '+142%', trend: 'up' },
    { name: '$VESTED_AI', change: '+89%', trend: 'up' },
    { name: '$SAFE_PUMP', change: '+56%', trend: 'up' },
    { name: '$NORUG', change: '+234%', trend: 'up' },
    { name: '$TRUST_AI', change: '+67%', trend: 'up' },
    { name: '$FAIR_LAUNCH', change: '+112%', trend: 'up' },
    { name: '$DIAMOND', change: '+45%', trend: 'up' },
    { name: '$LOCKED_IN', change: '+178%', trend: 'up' },
  ];

  return (
    <div className="relative overflow-hidden border-y border-white/5 py-3 bg-black/20 backdrop-blur-sm">
      <div className="ticker-container">
        <div className="ticker-content">
          {[...tokens, ...tokens, ...tokens].map((token, i) => (
            <div key={i} className="inline-flex items-center gap-3 mx-6">
              <span className="font-mono text-sm text-gray-400">{token.name}</span>
              <span className="text-sm font-bold text-green-400">{token.change}</span>
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Scroll-triggered section
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
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
    <div className="min-h-screen relative overflow-x-hidden">
      <GradientMeshBackground />
      <FloatingParticles />

      {/* Navigation */}
      <nav className="relative z-30 glass-nav border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
                <span className="text-white font-black text-xl">P</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-black text-white tracking-tight">
                  pump<span className="text-purple-400">.</span>notdump<span className="text-pink-400">.</span>fun
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {[
                { href: '/scanner', label: 'Scanner' },
                { href: '/vote', label: 'Vote' },
                { href: '/leaderboard', label: 'Board' },
                { href: '/docs', label: 'Docs' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/launch"
                className="ml-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all"
              >
                Launch Token
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Live Ticker */}
      <div className="relative z-20">
        <TokenTicker />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 pt-20 sm:pt-32 pb-32 sm:pb-48">
        <div className="max-w-7xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-card rounded-full hover:scale-105 transition-transform">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
            <span className="text-sm font-bold text-green-400 uppercase tracking-wide">Live on Solana Devnet</span>
            <span className="text-gray-600 mx-1">•</span>
            <span className="text-sm text-gray-400">Hackathon Build</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-6 leading-none">
            <span className="inline-block animate-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              pump.notdump
            </span>
            <br />
            <span className="text-white/10">.fun</span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl sm:text-3xl lg:text-5xl font-black text-white/90 mb-4 tracking-tight">
            The Anti-Rug Launchpad
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            AI agent tokens with <span className="text-purple-400 font-semibold">mandatory vesting</span>. Smart contract enforced. No backdoors. No rug pulls. Just fair launches.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              href="/launch"
              className="group relative px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch Your Token
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/scanner"
              className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white glass-card rounded-2xl hover:shadow-xl hover:shadow-white/10 hover:scale-105 border border-white/10 hover:border-purple-500/50 transition-all"
            >
              Scan Tokens
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {[
              { icon: '🔒', label: 'Smart Contract Enforced' },
              { icon: '⚡', label: 'Solana Speed' },
              { icon: '🛡️', label: 'Anti-Rug by Design' },
              { icon: '📊', label: 'On-Chain Transparent' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-400 transition-colors">
                <span className="text-xl">{badge.icon}</span>
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Why This Exists
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                The AI agent token space has a trust problem. We're fixing it at the protocol level.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-3xl p-8 sm:p-10 border-gradient-red hover:scale-[1.02] transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-red-400">The Problem</h3>
                </div>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  <span className="text-red-400 font-bold text-5xl">89%</span> of AI agent token launches on pump.fun result in rug pulls within 24 hours. Creators dump, investors lose, trust evaporates.
                </p>
                <div className="space-y-4">
                  {[
                    'Creator dumps 100% of holdings at launch',
                    'Zero accountability, zero consequences',
                    'Billions lost to pump-and-dump schemes',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-gray-400 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Solution */}
            <ScrollReveal delay={200}>
              <div className="glass-card rounded-3xl p-8 sm:p-10 border-gradient-green hover:scale-[1.02] transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-green-400">Our Solution</h3>
                </div>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  <span className="text-green-400 font-bold">Mandatory vesting</span> enforced by Solana smart contracts. Creators literally cannot dump. Their tokens unlock gradually over <span className="text-cyan-400 font-bold">3-12 months</span>.
                </p>
                <div className="space-y-4">
                  {[
                    'Time-locked vesting: 3, 6, or 12 months',
                    'On-chain enforcement, no backdoors',
                    'Aligned incentives for long-term building',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-400 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                How It Works
              </h2>
              <p className="text-gray-400 text-lg">Three steps to a rug-proof launch</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Launch',
                desc: 'Deploy your AI agent token with custom parameters. Choose your vesting period, distribution, and bonding curve.',
                icon: '🚀',
                color: 'purple',
              },
              {
                step: '02',
                title: 'Lock',
                desc: 'Creator tokens are automatically locked in our audited Solana program. Immutable. No admin keys. No escape hatches.',
                icon: '🔐',
                color: 'pink',
              },
              {
                step: '03',
                title: 'Claim',
                desc: 'Tokens vest linearly over time. Claim what is unlocked. Investors get confidence. Builders build. Everyone wins.',
                icon: '💎',
                color: 'cyan',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 100}>
                <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all relative overflow-hidden group border border-white/5 hover:border-purple-500/30">
                  {/* Step number bg */}
                  <div className="absolute -top-6 -right-6 text-[140px] font-black text-white/[0.02] leading-none select-none group-hover:text-white/[0.05] transition-colors">
                    {item.step}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-6 inline-block transform group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className={`text-xs font-black text-${item.color}-400 uppercase tracking-widest mb-3`}>
                      Step {item.step}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Connector arrow */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 z-20">
                      <svg className="w-full h-full text-purple-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="glass-strong rounded-3xl p-10 sm:p-16 relative overflow-hidden border border-white/10">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-black text-center text-white mb-12">
                  Protocol Metrics
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
                  {[
                    { value: 'Devnet', label: 'Network', color: 'text-purple-400', isNumber: false },
                    { value: 100, label: 'On-Chain', suffix: '%', color: 'text-cyan-400', isNumber: true },
                    { value: 0, label: 'Rug Pulls', color: 'text-green-400', isNumber: true },
                    { value: '3-12mo', label: 'Vesting', color: 'text-pink-400', isNumber: false },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className={`text-4xl sm:text-5xl lg:text-6xl font-black ${stat.color} mb-2`}>
                        {stat.isNumber ? (
                          <AnimatedCounter end={stat.value as number} suffix={stat.suffix || ''} />
                        ) : (
                          stat.value
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest font-bold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Program ID */}
                <div className="glass-card rounded-2xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                    <span className="text-xs font-black text-green-400 uppercase tracking-widest">
                      Solana Program ID (Devnet)
                    </span>
                  </div>
                  <code className="text-purple-300 font-mono text-xs sm:text-sm break-all block">
                    D5HsjjMSrCJyEF1aUuionRsx7MXfKEFWtmSnAN3cQBvB
                  </code>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Built Different
              </h2>
              <p className="text-gray-400 text-lg">
                Every feature exists to protect investors and reward builders
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🔒',
                title: 'Immutable Vesting',
                desc: 'Smart contract enforced. No admin keys. No pause. No rug.',
              },
              {
                icon: '📊',
                title: 'Token Scanner',
                desc: 'Real-time analysis of every token. Vesting status, holder distribution, risk score.',
              },
              {
                icon: '🗳️',
                title: 'Community Voting',
                desc: 'Vote on token legitimacy. Community-driven trust scores.',
              },
              {
                icon: '🏆',
                title: 'Leaderboard',
                desc: 'Top vetted tokens ranked by community trust and vesting compliance.',
              },
              {
                icon: '🤖',
                title: 'AI Agent Ready',
                desc: 'Purpose-built for the AI agent economy. Launch your agent token.',
              },
              {
                icon: '⚡',
                title: 'Solana Speed',
                desc: '400ms finality. Sub-cent fees. The fastest chain for the fastest agents.',
              },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 50}>
                <div className="glass-card rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all border border-white/5 hover:border-purple-500/30 group">
                  <div className="text-4xl mb-4 inline-block transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Waitlist */}
      <section className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass-strong rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
                  Ready to Launch
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                    Without the Rug?
                  </span>
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join the waitlist for early mainnet access. Be part of the first fair AI agent token launches.
                </p>

                {status === 'success' ? (
                  <div className="glass-card rounded-2xl p-10 max-w-md mx-auto border border-green-500/20">
                    <div className="text-6xl mb-4">💎</div>
                    <p className="text-green-400 text-2xl font-black mb-2">
                      You&apos;re #{count} on the waitlist
                    </p>
                    <p className="text-gray-400">We&apos;ll notify you when mainnet goes live.</p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-6 py-4 glass-card rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border border-white/5 focus:border-purple-500/50"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                    </button>
                  </form>
                )}

                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-4">Something went wrong. Try again.</p>
                )}

                <p className="text-xs text-gray-600 mt-6">
                  No spam. Just launch updates and early access.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">P</span>
              </div>
              <span className="text-sm text-gray-500 font-medium">pump.notdump.fun</span>
            </div>

            <div className="flex items-center gap-6 sm:gap-8 text-sm text-gray-600">
              <Link href="/docs" className="hover:text-gray-400 transition-colors font-medium">
                Docs
              </Link>
              <Link href="/scanner" className="hover:text-gray-400 transition-colors font-medium">
                Scanner
              </Link>
              <a
                href="https://github.com/Luij78/pumpnotdump"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors font-medium"
              >
                GitHub
              </a>
            </div>

            <p className="text-xs text-gray-700 font-medium">Built on Solana</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

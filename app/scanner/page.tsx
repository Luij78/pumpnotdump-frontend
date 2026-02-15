'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Token {
  name: string;
  symbol: string;
  mint: string;
  description?: string;
  marketCap: number;
  replyCount: number;
  createdAt: number;
  rugScore: number;
  rugLevel: string;
  hasWebsite: boolean;
  hasTwitter: boolean;
  hasTelegram: boolean;
}

interface ScanData {
  recentTokens: Token[];
  kingOfTheHill: Array<{ name: string; symbol: string; mint: string; marketCap: number }>;
  timestamp: string;
}

export default function ScannerPage() {
  const [data, setData] = useState<ScanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pumpfun')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const rugColor = (level: string) => {
    if (level === 'HIGH RISK') return 'text-red-400 bg-red-400/10 border-red-400/30';
    if (level === 'MODERATE') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    return 'text-green-400 bg-green-400/10 border-green-400/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              pump.notdump.fun
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/scanner" className="text-purple-400 font-semibold">Scanner</Link>
              <Link href="/monitor" className="text-gray-300 hover:text-white transition-colors font-semibold">Monitor</Link>
              <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors font-semibold">Analytics</Link>
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors font-semibold">Docs</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-bold text-white">Rug Scanner</h1>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-400/20 text-green-400 border border-green-400/30 animate-pulse">LIVE</span>
        </div>
        <p className="text-gray-400 mb-12">Real-time rug risk analysis of Pump.fun token launches</p>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Scanning Pump.fun...</p>
          </div>
        ) : data ? (
          <>
            {/* King of the Hill */}
            {data.kingOfTheHill?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">King of the Hill</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {data.kingOfTheHill.map((t) => (
                    <div key={t.mint} className="bg-yellow-900/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                      <div className="text-lg font-bold text-white">{t.symbol}</div>
                      <div className="text-xs text-gray-400 truncate">{t.name}</div>
                      <div className="text-sm text-yellow-400 mt-1">${(t.marketCap || 0).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Tokens */}
            <h2 className="text-xl font-bold text-white mb-4">Recently Launched ({data.recentTokens?.length || 0} tokens)</h2>
            <div className="space-y-3">
              {(data.recentTokens || []).map((token) => (
                <div key={token.mint} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-white">{token.symbol}</span>
                        <span className="text-gray-400 truncate">{token.name}</span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded border ${rugColor(token.rugLevel)}`}>
                          {token.rugLevel}
                        </span>
                      </div>
                      {token.description && (
                        <p className="text-sm text-gray-500 mb-2 truncate">{token.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>MC: ${(token.marketCap || 0).toLocaleString()}</span>
                        <span>{token.replyCount} replies</span>
                        <span className="flex items-center gap-1">
                          {token.hasWebsite && <span className="w-2 h-2 bg-green-400 rounded-full" title="Website"></span>}
                          {token.hasTwitter && <span className="w-2 h-2 bg-blue-400 rounded-full" title="Twitter"></span>}
                          {token.hasTelegram && <span className="w-2 h-2 bg-cyan-400 rounded-full" title="Telegram"></span>}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold" style={{ color: token.rugScore > 70 ? '#f87171' : token.rugScore > 40 ? '#fbbf24' : '#4ade80' }}>
                        {token.rugScore}
                      </div>
                      <div className="text-xs text-gray-500">Rug Score</div>
                      <a
                        href={`https://pump.fun/${token.mint}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:underline mt-1 block"
                      >
                        View on Pump.fun
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Last scan: {new Date(data.timestamp).toLocaleString()} | Data from pump.fun
            </p>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">Failed to fetch Pump.fun data. API may be rate-limited.</div>
        )}
      </div>
    </div>
  );
}

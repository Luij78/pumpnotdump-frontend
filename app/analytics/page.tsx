'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TokenData {
  programId: string;
  network: string;
  accountCount: number;
  programExists: boolean;
  programBalance: number;
  accounts: Array<{ pubkey: string; lamports: number; dataSize: number }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tokens')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
              <Link href="/analytics" className="text-purple-400 font-semibold">Analytics</Link>
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors font-semibold">Docs</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">On-Chain Analytics</h1>
        <p className="text-gray-400 mb-12">Live data from Solana devnet</p>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Fetching from Solana devnet...</p>
          </div>
        ) : data ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400">{data.programExists ? 'Active' : 'Inactive'}</div>
                <div className="text-sm text-gray-500 mt-1">Program Status</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400">{data.accountCount}</div>
                <div className="text-sm text-gray-500 mt-1">Program Accounts</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-pink-400">{(data.programBalance / 1e9).toFixed(4)}</div>
                <div className="text-sm text-gray-500 mt-1">Program SOL</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400">Devnet</div>
                <div className="text-sm text-gray-500 mt-1">Network</div>
              </div>
            </div>

            {/* Program Info */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Program Details</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Program ID</span>
                  <a 
                    href={`https://explorer.solana.com/address/${data.programId}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-purple-400 font-mono text-sm hover:underline break-all"
                  >
                    {data.programId}
                  </a>
                </div>
              </div>
            </div>

            {/* Accounts Table */}
            {data.accounts.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Program Accounts ({data.accountCount})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 border-b border-gray-700">
                        <th className="text-left py-3 px-2">Address</th>
                        <th className="text-right py-3 px-2">Balance (SOL)</th>
                        <th className="text-right py-3 px-2">Data Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.accounts.map((acc) => (
                        <tr key={acc.pubkey} className="border-b border-gray-800 hover:bg-gray-700/30">
                          <td className="py-3 px-2">
                            <a
                              href={`https://explorer.solana.com/address/${acc.pubkey}?cluster=devnet`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 font-mono hover:underline"
                            >
                              {acc.pubkey.slice(0, 8)}...{acc.pubkey.slice(-6)}
                            </a>
                          </td>
                          <td className="text-right py-3 px-2 text-green-400 font-mono">{(acc.lamports / 1e9).toFixed(4)}</td>
                          <td className="text-right py-3 px-2 text-gray-400">{acc.dataSize} bytes</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">Failed to load data from Solana devnet.</div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LaunchPage() {
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    agentType: 'trading',
    totalSupply: '1000000000',
    creatorAllocation: '10',
    vestingMonths: '6',
    description: '',
    twitterHandle: '',
    website: ''
  });

  const [launching, setLaunching] = useState(false);
  const [launchResult, setLaunchResult] = useState<{ success: boolean; tokenAddress?: string; message?: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLaunching(true);
    
    // Simulate contract interaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock success response
    const mockTokenAddress = 'G' + Math.random().toString(36).substring(2, 15).toUpperCase() + 'xyz';
    setLaunchResult({
      success: true,
      tokenAddress: mockTokenAddress,
      message: 'Token launched successfully with vesting protection!'
    });
    
    setLaunching(false);
  };

  const creatorTokens = Math.floor((parseFloat(formData.totalSupply) * parseFloat(formData.creatorAllocation)) / 100);
  const publicTokens = parseFloat(formData.totalSupply) - creatorTokens;
  const monthlyUnlock = Math.floor(creatorTokens / parseInt(formData.vestingMonths));

  if (launchResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/30 to-purple-900/30 border border-green-500/30 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">Token Launched!</h1>
            <p className="text-xl text-gray-300 mb-8">{formData.tokenName} (${formData.tokenSymbol}) is now live with rug protection.</p>
            
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/20 mb-8">
              <div className="text-sm text-gray-500 mb-2 font-mono">Token Address</div>
              <div className="text-green-400 font-mono text-lg break-all">{launchResult.tokenAddress}</div>
            </div>

            <div className="space-y-4 text-left mb-8">
              <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                <span className="text-gray-400">Total Supply</span>
                <span className="text-white font-semibold">{parseInt(formData.totalSupply).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                <span className="text-gray-400">Creator Allocation</span>
                <span className="text-purple-400 font-semibold">{creatorTokens.toLocaleString()} ({formData.creatorAllocation}%)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                <span className="text-gray-400">Vesting Period</span>
                <span className="text-pink-400 font-semibold">{formData.vestingMonths} months</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                <span className="text-gray-400">Monthly Unlock</span>
                <span className="text-green-400 font-semibold">{monthlyUnlock.toLocaleString()} tokens</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/token/${launchResult.tokenAddress}`}
                className="flex-1 px-6 py-3 text-center font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                View Token Dashboard
              </Link>
              <Link 
                href="/monitor"
                className="flex-1 px-6 py-3 text-center font-semibold text-white border-2 border-purple-500 rounded-lg hover:bg-purple-500/10 transition-all"
              >
                Browse All Tokens
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 px-6 py-20">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto mb-12">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Launch Your Token</h1>
          <p className="text-xl text-gray-400">Create an AI agent token with built-in rug protection</p>
        </div>

        <form onSubmit={handleLaunch} className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8">
          {/* Token Basics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Token Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Token Name *</label>
                <input
                  type="text"
                  name="tokenName"
                  value={formData.tokenName}
                  onChange={handleInputChange}
                  placeholder="AlphaTrader AI"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Token Symbol *</label>
                <input
                  type="text"
                  name="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={handleInputChange}
                  placeholder="ALPHA"
                  maxLength={6}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 uppercase"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-semibold">Agent Type</label>
              <select
                name="agentType"
                value={formData.agentType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="trading">Trading Agent</option>
                <option value="social">Social Media Agent</option>
                <option value="content">Content Creator Agent</option>
                <option value="research">Research Agent</option>
                <option value="gaming">Gaming Agent</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what your AI agent does..."
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Tokenomics */}
          <div className="mb-8 pb-8 border-b border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Tokenomics</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Total Supply *</label>
                <input
                  type="number"
                  name="totalSupply"
                  value={formData.totalSupply}
                  onChange={handleInputChange}
                  min="1000000"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Creator Allocation (%) *</label>
                <input
                  type="number"
                  name="creatorAllocation"
                  value={formData.creatorAllocation}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <p className="text-sm text-gray-500 mt-1">Max 30% for creator vesting</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-semibold">Vesting Period (Months) *</label>
              <select
                name="vestingMonths"
                value={formData.vestingMonths}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="3">3 months</option>
                <option value="6">6 months (recommended)</option>
                <option value="9">9 months</option>
                <option value="12">12 months</option>
              </select>
            </div>

            {/* Vesting Preview */}
            <div className="bg-black/30 rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Vesting Preview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Creator Tokens (Locked)</span>
                  <span className="text-purple-400 font-semibold">{creatorTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Public Tokens (Immediate)</span>
                  <span className="text-green-400 font-semibold">{publicTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Unlock Amount</span>
                  <span className="text-pink-400 font-semibold">{monthlyUnlock.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Full Unlock Date</span>
                  <span className="text-gray-300 font-semibold">
                    {new Date(Date.now() + parseInt(formData.vestingMonths) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Social Links (Optional)</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Twitter/X Handle</label>
                <input
                  type="text"
                  name="twitterHandle"
                  value={formData.twitterHandle}
                  onChange={handleInputChange}
                  placeholder="@youragent"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://youragent.ai"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2">Important Notice</h3>
                <p className="text-gray-300 text-sm">
                  Once launched, your creator tokens will be locked in the smart contract with no emergency withdrawal. 
                  This protects investors from rug pulls. Make sure your vesting schedule is correct.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={launching}
            className="w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {launching ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Launching Token...
              </span>
            ) : (
              'Launch Token with Rug Protection'
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Estimated transaction fee: ~0.01 SOL
          </p>
        </form>
      </div>
    </div>
  );
}

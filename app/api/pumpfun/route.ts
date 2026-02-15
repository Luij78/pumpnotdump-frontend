import { NextResponse } from 'next/server';

// Pump.fun API integration - fetch recent token launches
export async function GET() {
  try {
    // Fetch from Pump.fun's public API
    const [recentRes, kingRes] = await Promise.allSettled([
      fetch('https://frontend-api-v3.pump.fun/coins/recently-created?limit=10&offset=0&includeNsfw=false', {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 30 },
      }),
      fetch('https://frontend-api-v3.pump.fun/coins/king-of-the-hill?limit=5&offset=0&includeNsfw=false', {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 },
      }),
    ]);

    const recent = recentRes.status === 'fulfilled' && recentRes.value.ok
      ? await recentRes.value.json()
      : [];

    const king = kingRes.status === 'fulfilled' && kingRes.value.ok
      ? await kingRes.value.json()
      : [];

    // Analyze for rug signals
    const analyzed = (Array.isArray(recent) ? recent : []).map((token: any) => {
      const rugScore = calculateRugScore(token);
      return {
        name: token.name,
        symbol: token.symbol,
        mint: token.mint,
        description: token.description?.slice(0, 100),
        marketCap: token.usd_market_cap,
        replyCount: token.reply_count,
        createdAt: token.created_timestamp,
        rugScore,
        rugLevel: rugScore > 70 ? 'HIGH RISK' : rugScore > 40 ? 'MODERATE' : 'LOW RISK',
        hasWebsite: !!token.website,
        hasTwitter: !!token.twitter,
        hasTelegram: !!token.telegram,
      };
    });

    return NextResponse.json({
      recentTokens: analyzed,
      kingOfTheHill: (Array.isArray(king) ? king : []).slice(0, 5).map((t: any) => ({
        name: t.name,
        symbol: t.symbol,
        mint: t.mint,
        marketCap: t.usd_market_cap,
      })),
      timestamp: new Date().toISOString(),
      source: 'pump.fun',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Pump.fun data', details: String(error) }, { status: 500 });
  }
}

function calculateRugScore(token: any): number {
  let score = 50; // baseline

  // No socials = higher risk
  if (!token.website) score += 10;
  if (!token.twitter) score += 10;
  if (!token.telegram) score += 5;

  // Very new with no engagement = suspicious
  if (token.reply_count === 0) score += 10;

  // Low market cap with no community = higher risk
  if (token.usd_market_cap < 1000 && token.reply_count < 5) score += 15;

  // Has community = lower risk
  if (token.reply_count > 20) score -= 15;
  if (token.reply_count > 100) score -= 10;

  // Has social presence = lower risk
  if (token.website && token.twitter && token.telegram) score -= 20;

  return Math.max(0, Math.min(100, score));
}

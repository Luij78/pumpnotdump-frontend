import { NextResponse } from 'next/server';

const PROGRAM_ID = 'D5HsjjMSrCJyEF1aUuionRsx7MXfKEFWtmSnAN3cQBvB';
const DEVNET_RPC = 'https://api.devnet.solana.com';

export async function GET() {
  try {
    // Fetch program accounts from Solana devnet
    const response = await fetch(DEVNET_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getProgramAccounts',
        params: [
          PROGRAM_ID,
          { encoding: 'base64', commitment: 'confirmed' }
        ],
      }),
    });

    const data = await response.json();
    const accounts = data.result || [];

    // Also get program info
    const infoRes = await fetch(DEVNET_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'getAccountInfo',
        params: [PROGRAM_ID, { encoding: 'base64' }],
      }),
    });

    const infoData = await infoRes.json();

    return NextResponse.json({
      programId: PROGRAM_ID,
      network: 'devnet',
      accountCount: accounts.length,
      programExists: !!infoData.result?.value,
      programBalance: infoData.result?.value?.lamports || 0,
      accounts: accounts.slice(0, 20).map((a: { pubkey: string; account: { lamports: number; data: string[] } }) => ({
        pubkey: a.pubkey,
        lamports: a.account.lamports,
        dataSize: a.account.data[0]?.length || 0,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from Solana devnet', details: String(error) }, { status: 500 });
  }
}

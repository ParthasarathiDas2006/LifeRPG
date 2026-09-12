import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function GET() {
  try {
    const raids = dbService.getBossRaids();
    return NextResponse.json({ raids });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch Boss Raids';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { bossName, damage } = await req.json();
    if (!bossName || !damage) {
      return NextResponse.json({ error: 'bossName and damage are required' }, { status: 400 });
    }

    const result = dbService.strikeBossRaid(bossName, damage);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to strike Boss';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

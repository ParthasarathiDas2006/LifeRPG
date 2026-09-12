import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function GET() {
  try {
    const opponents = dbService.getArenaOpponents();
    return NextResponse.json({ opponents });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch Arena opponents';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { opponentId } = await req.json();
    if (!opponentId) {
      return NextResponse.json({ error: 'opponentId is required' }, { status: 400 });
    }

    const result = dbService.simulateArenaBattle(opponentId);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to simulate battle';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

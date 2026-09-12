import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { habitType } = await req.json();
    if (!habitType) {
      return NextResponse.json({ error: 'habitType is required' }, { status: 400 });
    }

    const result = dbService.claimQuickHabit(habitType);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to claim quick habit';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

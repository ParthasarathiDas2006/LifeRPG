import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function POST() {
  try {
    const result = dbService.spinDailyWheel();
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to spin Daily Wheel';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

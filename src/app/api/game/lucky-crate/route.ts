import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function POST() {
  try {
    const result = dbService.openLuckyCrate();
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to open Lucky Crate';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

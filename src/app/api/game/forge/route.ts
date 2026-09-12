import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { inventoryId } = await req.json();
    if (!inventoryId) {
      return NextResponse.json({ error: 'inventoryId is required' }, { status: 400 });
    }

    const result = dbService.enhanceItem(inventoryId);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Forge enhancement failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

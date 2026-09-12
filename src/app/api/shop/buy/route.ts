import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemId } = body;
    if (!itemId) {
      return NextResponse.json(
        { success: false, error: 'itemId is required' },
        { status: 400 }
      );
    }

    const result = dbService.buyItem(itemId);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Purchase failed';
    console.error('Error buying item:', message);
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

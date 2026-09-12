import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inventoryId } = body;
    if (!inventoryId) {
      return NextResponse.json(
        { success: false, error: 'inventoryId is required' },
        { status: 400 }
      );
    }

    const result = dbService.toggleEquip(inventoryId);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to toggle equip';
    console.error('Error equipping item:', message);
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

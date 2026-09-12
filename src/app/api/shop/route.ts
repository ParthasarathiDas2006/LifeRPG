import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function GET() {
  try {
    const shopItems = dbService.getShop();
    return NextResponse.json({ success: true, items: shopItems });
  } catch (error) {
    console.error('Error fetching shop:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shop items' },
      { status: 500 }
    );
  }
}

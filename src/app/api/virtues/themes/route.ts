import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function GET() {
  try {
    const themes = dbService.getVirtueThemes();
    return NextResponse.json({ success: true, themes });
  } catch (error) {
    console.error('Error fetching themes:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch themes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.themeId) {
      return NextResponse.json({ success: false, error: 'themeId is required' }, { status: 400 });
    }

    const result = dbService.setVirtueTheme(body.themeId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error setting theme:', error);
    return NextResponse.json({ success: false, error: 'Failed to set theme' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function GET() {
  try {
    const data = dbService.getTalents();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch Talents';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { talentId } = await req.json();
    if (!talentId) {
      return NextResponse.json({ error: 'talentId is required' }, { status: 400 });
    }

    const result = dbService.upgradeTalent(talentId);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to upgrade Talent';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

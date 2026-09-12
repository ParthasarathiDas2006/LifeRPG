import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';
import { CharacterConfig } from '@/lib/types';

export async function GET() {
  try {
    const character = dbService.getCharacter();
    return NextResponse.json({ success: true, character });
  } catch (error) {
    console.error('Error fetching character:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch character' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<CharacterConfig> = await request.json();
    
    // Basic validation
    if (body.name && body.name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Character name cannot be empty' },
        { status: 400 }
      );
    }

    const updated = dbService.updateCharacter({
      ...(body.name ? { name: body.name.trim() } : {}),
      ...(body.class ? { class: body.class } : {}),
      ...(body.gender ? { gender: body.gender } : {}),
      ...(body.title ? { title: body.title.trim() } : {}),
      ...(body.avatarUrl ? { avatarUrl: body.avatarUrl } : {}),
      ...(body.avatarType ? { avatarType: body.avatarType } : {}),
      ...(body.spriteParts ? { spriteParts: body.spriteParts } : {}),
      ...(body.sourcePhotoUrl ? { sourcePhotoUrl: body.sourcePhotoUrl } : {}),
      ...(body.generationStyle ? { generationStyle: body.generationStyle } : {}),
      ...(body.generationSeed !== undefined ? { generationSeed: body.generationSeed } : {}),
      ...(body.uniqueHeroId ? { uniqueHeroId: body.uniqueHeroId } : {}),
      ...(body.gameOrigin ? { gameOrigin: body.gameOrigin } : {}),
      ...(body.abilityName ? { abilityName: body.abilityName } : {}),
      ...(body.abilityBuff ? { abilityBuff: body.abilityBuff } : {}),
      ...(body.humanSpecs ? { humanSpecs: body.humanSpecs } : {}),
    });

    return NextResponse.json({ success: true, character: updated });
  } catch (error) {
    console.error('Error updating character:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update character' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    if (!taskId) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }

    let reflectionData: { text?: string; moodRating?: number; honestyAffirmed?: boolean } | undefined;
    try {
      const body = await request.json();
      if (body) {
        reflectionData = {
          text: body.reflectionText || body.text,
          moodRating: body.moodRating,
          honestyAffirmed: body.honestyAffirmed !== undefined ? body.honestyAffirmed : true,
        };
      }
    } catch {
      // Body may be empty for simple clicks
    }

    const result = dbService.completeTask(taskId, reflectionData);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to complete task';
    console.error('Error completing task:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

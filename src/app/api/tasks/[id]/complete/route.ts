import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';
import { verifySessionToken } from '@/lib/antiCheat';

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

    // Optional session token verification
    const authHeader = request.headers.get('authorization');
    let userId = 'default-player';
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const verification = verifySessionToken(token);
      if (verification.valid && verification.payload) {
        userId = verification.payload.userId;
      }
    }

    const result = dbService.completeTask(taskId, userId);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error as { message?: string; statusCode?: number; retryAfter?: number };
    const message = err.message || 'Failed to complete task';
    const statusCode = err.statusCode || 400;

    console.error(`[Anti-Cheat Enforcement] ${statusCode}: ${message}`);
    return NextResponse.json(
      {
        success: false,
        error: message,
        ...(err.retryAfter ? { retryAfterSeconds: err.retryAfter } : {}),
      },
      { status: statusCode }
    );
  }
}

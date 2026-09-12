import { NextResponse } from 'next/server';
import { signSessionToken, verifySessionToken } from '@/lib/antiCheat';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action = 'LOGIN', email, username = 'HeroAdventurer', password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // In a full DB deployment, verify against bcrypt password hash.
    // For demo/session generation, derive a consistent user ID
    const userId = `usr_${Buffer.from(email.toLowerCase().trim()).toString('hex').slice(0, 16)}`;
    const token = signSessionToken(userId, username, 'USER');

    return NextResponse.json({
      success: true,
      message: action === 'SIGNUP' ? 'Account created successfully' : 'Session authenticated',
      token,
      user: {
        id: userId,
        email,
        username,
        role: 'USER',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    const verification = verifySessionToken(token);
    if (!verification.valid || !verification.payload) {
      return NextResponse.json(
        { success: false, error: verification.error || 'Unauthorized session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      session: verification.payload,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Verification failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

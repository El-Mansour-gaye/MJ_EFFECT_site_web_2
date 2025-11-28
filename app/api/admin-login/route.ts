// /app/api/admin-login/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '../../../lib/session';

export async function POST(request: Request) {
  const session = await getSession();
  try {
    const { password } = await request.json();

    // Securely check the password on the server-side
    const isAdmin = password === process.env.ADMIN_PASSWORD;

    if (isAdmin) {
      // Create a secure session
      session.isLoggedIn = true;
      await session.save();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  }
}

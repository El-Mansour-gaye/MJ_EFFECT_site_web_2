// /app/api/admin-login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Securely check the password on the server-side
    const isAdmin = password === process.env.ADMIN_PASSWORD;

    if (isAdmin) {
      // Password is correct, send success response
      return NextResponse.json({ success: true });
    } else {
      // Password is incorrect
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    // Handle potential errors, like malformed JSON
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  }
}

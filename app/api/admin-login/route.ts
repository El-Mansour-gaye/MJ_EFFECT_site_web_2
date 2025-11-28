// /app/api/admin-login/route.ts
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';

// Function to generate a simple, stateless token
function generateAuthToken(password: string): string {
  // We'll use a SHA-256 hash of the password as the token.
  // This is simple and doesn't require storing any state on the server.
  return createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD is not set');
    }

    // Securely check the password on the server-side
    const isAdmin = password === adminPassword;

    if (isAdmin) {
      // Password is correct, generate and return a token
      const token = generateAuthToken(adminPassword);
      return NextResponse.json({ success: true, token });
    } else {
      // Password is incorrect
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    // Handle potential errors, like malformed JSON or missing env var
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  }
}

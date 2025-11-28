// lib/admin-auth.ts
import { createHash } from 'crypto';
import { NextRequest } from 'next/server';

function generateAuthToken(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export function verifyAuth(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD is not set. Cannot verify auth.');
    return false;
  }

  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return false;
  }

  const expectedToken = generateAuthToken(adminPassword);
  return token === expectedToken;
}

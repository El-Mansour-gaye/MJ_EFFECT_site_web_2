
import { NextRequest } from 'next/server';
import { createHash } from 'crypto';

export function isAdmin(req: NextRequest): boolean {
  const token = req.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) {
    return false;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD is not set');
    return false;
  }

  const expectedToken = createHash('sha256').update(adminPassword).digest('hex');
  return token === expectedToken;
}

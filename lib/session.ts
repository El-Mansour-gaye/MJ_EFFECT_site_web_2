// lib/session.ts
import { getIronSession, IronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export interface SessionData extends IronSessionData {
  isLoggedIn?: boolean;
}

const adminPassword = process.env.ADMIN_PASSWORD;

// The user has requested a simple setup with a single ADMIN_PASSWORD.
// However, iron-session requires a secure key of at least 32 characters
// to encrypt the session cookie. To meet this requirement without asking the
// user for a separate, long secret, we derive a key from their password.
if (!adminPassword || adminPassword.length < 1) {
  throw new Error('ADMIN_PASSWORD environment variable is not set or is empty.');
}

// We use SHA-256 to hash the ADMIN_PASSWORD. This creates a 32-byte (256-bit) key,
// which is a fixed length and securely derived from the user's password.
// This allows the user to have a simple password while the session remains secure.
const sessionPassword = createHash('sha256').update(adminPassword).digest('hex').slice(0, 32);

export const sessionOptions = {
  cookieName: 'mjeffect_admin_session',
  password: sessionPassword,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
};

export function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}

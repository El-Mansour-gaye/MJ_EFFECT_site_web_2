// /components/admin/security/AdminSessionManager.tsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ADMIN_AUTH_TOKEN_KEY = 'admin-auth-token';

const AdminSessionManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    // This component is only active on the client-side
    if (typeof window === 'undefined') {
      return;
    }

    const token = sessionStorage.getItem(ADMIN_AUTH_TOKEN_KEY);

    // If there's a token but the user navigates away from the /admin section,
    // clear the token to log them out automatically.
    if (token && !pathname.startsWith('/admin')) {
      sessionStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
      // Optional: You could add a console log here for debugging purposes
      // console.log("Admin session cleared due to navigating away from /admin.");
    }
  }, [pathname]); // This effect runs every time the URL path changes

  // This component does not render anything to the DOM
  return null;
};

export default AdminSessionManager;

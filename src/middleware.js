// middleware.js
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/',
    '/solver',
    '/rules',
    '/api/:path*',
  ],
};

// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except static files and Next.js internals
    "/((?!_next|.*\\.(?:png|jpg|jpeg|svg|css|js|json|ico|woff2?|ttf|map)).*)",
    // Always protect API routes
    "/(api|trpc)(.*)",
  ],
};

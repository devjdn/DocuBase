import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // This is protecting all routes that start with '/admin'.
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  const visited = req.cookies.get('hasVisited');

  if(req.nextUrl.pathname === '/' && visited?.value === 'true') {
    return NextResponse.redirect(new URL('/links', req.url));
  }

  if (!visited) {
    const response = NextResponse.next();
    response.cookies.set('hasVisited', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/:path*',
    '/links/:path*',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
  // runtime: 'experimental-edge',
};

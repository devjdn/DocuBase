import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	const url = req.nextUrl;
	const visited = req.cookies.get("hasVisited");

	// This is protecting all routes that start with '/admin'.
	if (
		isAdminRoute(req) &&
		(await auth()).sessionClaims?.metadata?.role !== "admin"
	) {
		return NextResponse.redirect(new URL("/vault", req.url));
	}

	if (url.pathname === "/") {
		if (visited?.value === "true") {
			return NextResponse.redirect(new URL("/vault", req.url));
		} else {
			const response = NextResponse.redirect(
				new URL("/landing", req.url),
			);
			response.cookies.set("hasVisited", "true", {
				path: "/",
				maxAge: 60 * 60 * 24 * 365, // 1 year
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
			});

			return response;
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/:path*",
		"/vault/:path*",
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
	// runtime: 'experimental-edge',
};

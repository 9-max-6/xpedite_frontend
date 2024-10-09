import { NextResponse } from 'next/server';
import { parse } from 'cookie'; // Use 'cookie' module to parse cookies

// Define the paths that require authentication
const protectedPaths = ['/dashboard'];

export const config = {
  matcher: ['/dashboard/:path*'], // Applies middleware to any path that contains "/dashboard"
};

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Parse cookies using the 'cookie' module
  const cookies = parse(req.headers.get('cookie') || '');

  // Check if the user is accessing a path that contains "dashboard"
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = cookies.accessToken; // Assuming you store your JWT in a cookie called 'token'
    // If no token exists, redirect to the login page
    if (!token) {
      const loginUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Optional: Validate the token (e.g., using JWT)
  }

  // Allow the request to continue if token is valid or path is not protected
  return NextResponse.next();
}

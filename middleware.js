// middleware.js
import { NextResponse } from 'next/server';

// 1. Define Public and Protected Routes
// Routes accessible to everyone (and users should be redirected *from* if logged in)
const AUTH_ROUTES = ['/login', '/signup'];

// Routes that *require* authentication (all routes under /dashboard and createProfile)
const PROTECTED_ROUTES = ['/createProfile', '/dashboard'];

// Utility to check for an auth token cookie
function isAuthenticated(request) {
  // Check for your secure session/auth cookie here.
  // We use 'auth_token' as an example name.
  return !!request.cookies.get('auth_token'); 
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userIsAuthenticated = isAuthenticated(request);

  const isAuthRoute = AUTH_ROUTES.some(route => pathname === route);
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  // --- Core Middleware Logic ---

  // A. Logic for AUTH PAGES (login, signup)
  if (isAuthRoute && userIsAuthenticated) {
    // If the user is logged in and tries to access login/signup, redirect to the dashboard home.
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // B. Logic for PROTECTED PAGES (dashboard/*, createProfile)
  if (isProtectedRoute && !userIsAuthenticated) {
    // If the user is NOT logged in and tries to access a protected page, redirect to login.
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname); // Optional: remember where they were going
    return NextResponse.redirect(url);
  }
  
  // C. Special Logic for '/createProfile'
  // NOTE: This assumes 'createProfile' is the *mandatory* next step after signup/login 
  // until the profile is complete. If you have a profile completion flag (e.g., in a cookie
  // or API check), you would put that check here to force the redirect.

  // Allow the request to proceed if no redirect conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except API routes, static files, and assets
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
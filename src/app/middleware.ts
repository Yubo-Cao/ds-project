// const PUBLIC_PATHS = ["/login", "/register", "/", "/blog", "/members"];

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth-token")?.value;
//   const isPublicPath =
//     PUBLIC_PATHS.includes(request.nextUrl.pathname) ||
//     request.nextUrl.pathname.startsWith("/blog");
//   const isLogin = token && (await verifyToken(token));

//   if (!isPublicPath && !isLogin) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (isLogin && isPublicPath) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|favicon.ico).*)"],
// };

export { auth as middleware } from "@/lib/auth-config";

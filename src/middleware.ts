// _middleware.ts
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/sign-in"],

  afterAuth(auth, req, evt) {
    console.log(req.nextUrl.pathname) 
    console.log(auth);

    if (!auth.userId && req.nextUrl.pathname !== '/sign-in') {
      if (req.nextUrl.pathname.startsWith('/sign-up')) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
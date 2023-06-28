import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {

    // Control de entrada

    // console.log(req.nextauth.token);

    const { user } = req.nextauth.token as { user: { email: string, fullname: string, image: string, role: string }};

    if(req.nextUrl.pathname.startsWith('/dashboard/admin')) {

      if(user.role === "admin") {
        return NextResponse.rewrite(new URL('/dashboard/admin', req.url));
      } else {
        return NextResponse.redirect(new URL('/', req.url));
        
      }
    }
  },
  { // TODO: Intentar quitar el callbacks y usar solo middleware...
    callbacks: {
      authorized: ({ token, req }) => {

        if(!token) {
          return false
        }

        return true;

      },
    }, 
  }
)

export const config = { matcher: ["/dashboard/:path*"] }
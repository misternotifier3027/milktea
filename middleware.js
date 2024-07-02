
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.includes("/product/createOrUpdate") || req.nextUrl.pathname.includes("/type-product/createOrUpdate") || req.nextUrl.pathname.includes("/topping/createOrUpdate")) {
      if (req.nextauth.token.role != "admin") {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // dưới này là check có token không, có token thì chạy trong code,ko là bắt đăng nhập
        if (req.nextUrl.pathname.startsWith("/admin")) {
          if (token && token.role === "admin") {
            return true
          }
          return false
        }
        return true
      }
    },
    pages: {
      signIn: "/admin/signin",
    }
  }
)

export const config = { matcher: ["/admin/:path*", "/api/product/createOrUpdate", "/api/type-product/createOrUpdate", "/api/topping/createOrUpdate"] }

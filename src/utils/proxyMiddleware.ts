import { NextResponse } from "next/server";

export function middleware(request: any) {
  if (request.nextUrl.pathname.startsWith("/external-api")) {
    let newUrl = new URL(
      request.nextUrl.pathname.replace(/^\/external-api/, "") +
        request.nextUrl.search,
      process.env.EXTERNAL_API
    );
    return NextResponse.rewrite(newUrl);
  }
}

import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(request: NextRequest) {

    const Token = request.headers.get("authorization") as string;

    if (!Token) {
        return new NextResponse(JSON.stringify({
            Error: "Token Not Found"
        }),{
            status: 401
        })
    }

    const signature = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jose.jwtVerify(Token, signature);
    } catch (error) {
        return new NextResponse(JSON.stringify({
            Error: "Unauthorized Request"
        }),{
            status: 401
        })
    }
}

export const config = {
    matcher: ['/api/auth/user']
}
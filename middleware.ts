import { NextResponse, NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(req: NextRequest, res: NextResponse) {

    const bearerToken = req.headers.get("Authorization") as string;
    
    if (!bearerToken) {
        return NextResponse.json({ message: "Unauthorised Request" });
    }
    const token = bearerToken.split(" ")[1];
    if (!token) {
        return NextResponse.json({ message: "Unauthorised Request" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jose.jwtVerify(token, secret)
    }
    catch (error) {
        return NextResponse.json({ errorMessage: "Unauthorized request" });
    }
}

export const config = {
    matcher: ["/api/user"]
}
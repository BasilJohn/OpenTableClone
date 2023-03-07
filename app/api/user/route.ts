import { NextResponse, NextRequest } from 'next/server';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {

    const bearerToken = request.headers.get("Authorization") as string;

    const token = bearerToken.split(" ")[1];

    const payload = jwt.decode(token) as { email: string };
    if (!payload) {
        return NextResponse.json({ message: "Unauthorised Request" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            city: true,
            phone: true,
        }
    });

    if (!user) {
        return NextResponse.json({ errorMessage: "User not found." }, { status: 401 });
    }

    return NextResponse.json({ user });
}

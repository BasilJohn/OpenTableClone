import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  
    const body = await request.json();
    const {
        email, password } = body;

    const errors: string[] = [];

    const validationSchema = [
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is Invalid."
        },
        {
            valid: validator.isLength(password, {
                min: 1
            }),
            errorMessage: "Password is Invalid"
        }
    ];

    validationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.errorMessage);
        }
    });

    if (errors.length > 0) {
        return NextResponse.json({ errorMessage: errors[0] }, { status: 401 });
    }

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!userWithEmail) {
        return NextResponse.json({ errorMessage: "Email not registered." }, { status: 401 });
    }

    const isMatched = userWithEmail.password === password;
    if (!isMatched) {
        return NextResponse.json({ errorMessage: "Email or Password is invalid." }, { status: 401 });
    }
    else {
        const algo = "HS256";
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new jose.SignJWT({ email: userWithEmail.email }).
            setProtectedHeader({ alg: algo }).
            setExpirationTime("24h").sign(secret);

        const response = NextResponse.json({
            first_name: userWithEmail.first_name,
            last_name: userWithEmail.last_name,
            email: userWithEmail.email,
            phone: userWithEmail.phone,
            city: userWithEmail.city,
            token: token
        });
        response.cookies.set("jwt", token);
        return response;
    }

}


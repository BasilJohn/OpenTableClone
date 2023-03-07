import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, context: { params: any }) {
    const body = await request.json();
    const { firstName,
        lastName,
        email,
        phone,
        city,
        password } = body;

    const errors: string[] = [];

    const validationSchema = [
        {
            valid: validator.isLength(firstName, {
                min: 1,
                max: 20
            }),
            errorMessage: "First name is invalid."
        },
        {
            valid: validator.isLength(lastName, {
                min: 1,
                max: 20
            }),
            errorMessage: "Last name is invalid."
        },
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is Invalid."
        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage: "Phone number is invalid."
        },
        {
            valid: validator.isLength(city, {
                min: 1,
            }),
            errorMessage: "City is invalid."
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password is not strong."
        }
    ];

    validationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.errorMessage);
        }
    });
    if (errors.length > 0) {
        return NextResponse.json({ errorMessage: errors[0] },{ status: 401 });
    }

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if (userWithEmail) {
        return NextResponse.json({ errorMessage: "Email registered already." }, { status: 401 });
    }

    //const salt = await bcrypt.genSalt(10);
    ///const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phone: phone,
            city: city,

        }
    });

    const algo = "HS256";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ email: user.email }).
        setProtectedHeader({ alg: algo }).
        setExpirationTime("24h").sign(secret);

    const response = NextResponse.json({ message: "User added successfully",token:token,user:user });
    response.cookies.set("jwt",token);
    return response;
}


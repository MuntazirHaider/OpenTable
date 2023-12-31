import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import validator from 'validator';

interface FormData {
    name: string;
    city: string;
    email: string;
    password: string;
    phone: string;
}

const prisma = new PrismaClient();

export async function GET(){
    return NextResponse.json({
        name: "Aimash",
        class: "B.C.A",
        age: 20
    })
}

export async function POST(request: Request){
    const response: FormData = await request.json();
    const {name,city,phone,email,password} = response;

    const error: string[] = [];
    const ValidateSchema = [
        {
            valid: validator.isLength(name,{min:2}),
            errorMessage: "Name is invalid"
        },
        {
            valid: validator.isLength(city,{min:2}),
            errorMessage: "City is invalid"
        },
        {
            valid: validator.isLength(phone,{min: 10, max: 10}),
            errorMessage: "Phone Number is invalid"
        },
        {
            valid: validator.isEmail(email),
            errorMessage: "Email format is invalid"
        },
        {
            valid: validator.isLength(password,{min: 6}),
            errorMessage: "Password is Short"
        }
    ]

    ValidateSchema.forEach((check)=>{
        if(!check.valid){
            error.push(check.errorMessage);
        }
    })

    if(error.length){
        return new NextResponse(JSON.stringify({Error: error[0]}),{status: 400});
    }

    let userWithEmail = await prisma.user.findFirst({
        where: {
          email: email
        }
      })

    if(userWithEmail){
        return new NextResponse(JSON.stringify({ Error: "User with this email is already exist" }),{status: 406});;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name: name,
            city: city,
            phone: phone,
            email: email,
            password: hashedPassword
        }
    })

    const alg = "HS384";
    const signature = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({email: email})
    .setProtectedHeader({alg})
    .setExpirationTime("24h")
    .sign(signature);

    const responseData = NextResponse.json({ 
        id: user.id,
        name: user.name,
        city: user.city,
        phone: user.phone,
        email: user.email
     }, {status: 200});

     responseData.cookies.set({
        name: "JWT",
        value: token,
        maxAge: 60 * 60 * 24
     })
    

    return responseData;
}
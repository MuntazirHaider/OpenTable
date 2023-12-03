import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import validator from 'validator';

interface FormData {
    email: string;
    password: string;
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
    const {email,password} = response;

    const error: string[] = [];
    const ValidateSchema = [
        {
            valid: validator.isEmail(email),
            errorMessage: "Email format is invalid"
        },
        {
            valid: validator.isLength(password,{min: 6}),
            errorMessage: "Password is Invalid"
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

    let user = await prisma.user.findFirst({
        where: {
          email: email
        }
      })

    if(!user){
        return new NextResponse(JSON.stringify({ Error: "User is not found!!" }),{status: 404});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return new NextResponse(JSON.stringify({ Error: "Password is incorrect" }),{status: 401});
    }

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
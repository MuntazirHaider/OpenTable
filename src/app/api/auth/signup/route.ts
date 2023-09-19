import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from 'validator';

interface FormData {
    name: string;
    city: string;
    email: string;
    password: string;
    phone: number;
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
            valid: validator.isLength(String(phone),{min: 10, max: 10}),
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
        return NextResponse.json({Error: error[0]})
    }

    let userWithEmail = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

    if(userWithEmail){
        return NextResponse.json({ Error: "User with this email is already exist" })
    }
    

    return NextResponse.json({ response })
}
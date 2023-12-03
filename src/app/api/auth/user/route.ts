import { NextResponse } from "next/server";
import { headers } from "next/headers";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request : Request){
    
    const headerInstance = headers();
    const Token =  headerInstance.get("authorization") as string;

    const payload = jwt.decode(Token) as {email: string};

    const user = await prisma.user.findFirst({
        where:{ 
            email: payload?.email
        },
        select: {
            id: true,
            name: true,
            city: true,
            phone: true,
            email: true
        }
    })

    return NextResponse.json({
        id: user?.id,
        name: user?.name,
        city: user?.city,
        phone: user?.phone,
        email: user?.email
    })
}


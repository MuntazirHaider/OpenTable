import { NextRequest, NextResponse } from "next/server";
import { times } from "@/data";
import { PrismaClient } from "@prisma/client";
import { tabClasses } from "@mui/material";
import { findAvailableTable } from "@/utils/findAvailableTable";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    const partySize: string = req.nextUrl.searchParams.get("partySize") as string;
    const bookingTime: string = req.nextUrl.searchParams.get("time") as string;
    const bookingDate: string = req.nextUrl.searchParams.get("date") as string;
    if (!partySize || !bookingTime || !bookingDate) {
        return NextResponse.json(
            { errorMessage: "Invalid data provided" },
            { status: 400 }
        )
    }

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true
        }
    })
    
    if (!restaurant){
        return NextResponse.json(
            { errorMessage: "No Restaurant Found" },
            { status: 400 }
        )
    }

const searchedTimesWithTable = await findAvailableTable({
    bookingTime,
    bookingDate,
    restaurant,
})

if (!searchedTimesWithTable){
    return NextResponse.json(
        { errorMessage: "Not Available" },
        { status: 400 }
    )
}

    const availabilities = searchedTimesWithTable.map((t) => {
        const totalSeats = t.tables?.reduce((sum, table) => {
            return sum + table.seats;
        }, 0)
        return {
            time: t.time,
            available: totalSeats as number >= Number(partySize) && (
                new Date(`${bookingDate}T${t.time}`) >= new Date(`${bookingDate}T${restaurant?.open_time}`) &&
                new Date(`${bookingDate}T${t.time}`) <= new Date(`${bookingDate}T${restaurant?.close_time}`)
            )
        }
    })

    return NextResponse.json(
        {
            // searchedTime,
            // bookings,
            // bookingObj,
            // restaurantTable,
            // searchedTimesWithTable,
            availabilities
        }
    );

}

// http://localhost:3000/api/restaurant/curryish-tavern-toronto?partySize=1-4&time="00:30:00.000Z"&date=05102020
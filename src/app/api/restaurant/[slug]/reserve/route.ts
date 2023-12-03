import { findAvailableTable } from "@/utils/findAvailableTable";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface reserveData {
    "name": string
    "email": string
    "phone": string
    "occasion": string
    "request": string
}

export async function POST(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    const partySize: string = req.nextUrl.searchParams.get("partySize") as string;
    const bookingTime: string = req.nextUrl.searchParams.get("time") as string;
    const bookingDate: string = req.nextUrl.searchParams.get("date") as string;

    const {name,email,phone,occasion,request}: reserveData = await req.json();

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true,
            id: true
        }
    })

    if (!restaurant) {
        return NextResponse.json(
            { errorMessage: "No Restaurant Found" },
            { status: 400 }
        )
    }

    if (new Date(`${bookingDate}T${bookingTime}`) < new Date(`${bookingDate}T${restaurant.open_time}`)
        || new Date(`${bookingDate}T${bookingTime}`) > new Date(`${bookingDate}T${restaurant.close_time}`)) {
        return NextResponse.json(
            { errorMessage: "Not Available" },
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

    const availableTable = searchedTimesWithTable.find((time)=>{
        return time.date.toISOString() === new Date(`${bookingDate}T${bookingTime}`).toISOString();
    });

    const tableCount: {
        2: number[],
        4: number[],
        8: number[]
    } = {
        2: [],
        4: [],
        8: []
    }

    availableTable?.tables.forEach(table => {
        if (table.seats === 2) {
            tableCount[2].push(table.id);
        }else if(table.seats === 4){
            tableCount[4].push(table.id)
        }
        else if(table.seats === 8){
            tableCount[8].push(table.id)
        }else{
            return NextResponse.json(
                { errorMessage: "No. of seats not available in table" },
                { status: 400 }
            )
        }
    })

    const tableToBook:number[] = [];
    let requiredSeat = parseInt(partySize);

    while(requiredSeat > 0){
        if(requiredSeat < 3){
            if (tableCount[2].length) {
                tableToBook.push(tableCount[2][0]);
                tableCount[2].shift();
                requiredSeat -= 2; 
            }else if(tableCount[4].length){
                tableToBook.push(tableCount[4][0]);
                tableCount[4].shift();
                requiredSeat -= 4;
            }else if(tableCount[8].length){
                tableToBook.push(tableCount[8][0]);
                tableCount[8].shift();
                requiredSeat -= 8;
            }else{
                break;
            }
        }else if(requiredSeat <= 4){
            if (tableCount[4].length) {
                tableToBook.push(tableCount[4][0]);
                tableCount[4].shift();
                requiredSeat -= 4; 
            }else if(tableCount[8].length){
                tableToBook.push(tableCount[8][0]);
                tableCount[8].shift();
                requiredSeat -= 8;
            }else if(tableCount[2].length){
                tableToBook.push(tableCount[2][0]);
                tableCount[2].shift();
                requiredSeat -= 2;
            }else{
                break;
            }
        }else{
            if (tableCount[8].length) {
                tableToBook.push(tableCount[8][0]);
                tableCount[8].shift();
                requiredSeat -= 8; 
            }else if(tableCount[4].length){
                tableToBook.push(tableCount[4][0]);
                tableCount[4].shift();
                requiredSeat -= 4;
            }else if(tableCount[2].length){
                tableToBook.push(tableCount[2][0]);
                tableCount[2].shift();
                requiredSeat -= 2;
            }else{
                break;
            }
        }
    }

    if(requiredSeat > 0){
        return NextResponse.json(
            { errorMessage: "No. of seats not available in table" },
            { status: 400 }
        )
    }

    const booking = await prisma.booking.create({
        data:{
            party_size: partySize,
            booking_time: new Date(`${bookingDate}T${bookingTime}`),
            booker_name: name,
            booker_email: email,
            booker_phone: phone,
            occasion: occasion,
            request: request,
            restaurant_id: restaurant.id,
        }
    })

    const bookingOnTable = tableToBook.map(table_id => {
        return {
            table_id,
            booking_id: booking.id
        }
    })

    await prisma.bookingOnTable.createMany({
        data: bookingOnTable
    })

    return NextResponse.json({
        // slug,
        // partySize,
        // bookingTime,
        // bookingDate,
        // searchedTimesWithTable,
        // availableTable,
        // tableCount,
        // tableToBook
        booking
    })
}
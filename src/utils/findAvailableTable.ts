import { times } from "@/data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAvailableTable = async ({
    bookingTime,
    bookingDate,
    restaurant
}:{
    bookingTime: string
    bookingDate: string
    restaurant:  {
        tables: {
            id: number;
            seats: number;
            restaurant_id: number;
            created_at: Date;
            updated_at: Date;
        }[];
        open_time: string;
        close_time: string;
    } 
}) => {

    const searchedTime = times.find(t => {
        return t.time === bookingTime
    })?.searchTimes;

    if (!searchedTime) {
        return null;
    }

    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${bookingDate}T${searchedTime[0]}`),
                lte: new Date(`${bookingDate}T${searchedTime[searchedTime.length - 1]}`),
            }
        },
        select: {
            id: true,
            party_size: true,
            booking_time: true,
            tables: true,
        }
    })

    const bookingObj: { [key: string]: { [key: number]: true } } = {}

    bookings.forEach((booking) => {
        bookingObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
            return {
                ...obj,
                [table.table_id]: true,
            };
        }, {}
        )
    })

    const restaurantTable = restaurant?.tables;

    const searchedTimesWithTable = searchedTime.map(time => {
        return {
            date: new Date(`${bookingDate}T${time}`),
            time,
            tables: restaurantTable
        }
    });

    searchedTimesWithTable.forEach(t => {
        t.tables = t.tables?.filter((table) => {
            if (bookingObj[t.date.toISOString()]) {
                if (bookingObj[t.date.toISOString()][table.id]) {
                    return false;
                }
            }
            return true;
        })
    })
  return searchedTimesWithTable;
}

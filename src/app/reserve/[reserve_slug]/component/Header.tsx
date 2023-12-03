import React from 'react'
import { searchParams } from '../page'
import { format } from "date-fns";
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const Header = async ({
    params, searchParams
}: {
    params: { reserve_slug: string }
    searchParams: searchParams
}) => {
    const { partySize, date, time } = searchParams;

    const convertToDisplayTime = (time: string) => {
        const arr = time.split(':');
        const hour = Number(arr[0]);

        if (hour >= 12) {
            const displayHour = hour > 12 ? hour - 12 : 12;
            return `${displayHour}:${arr[1]} PM`;
        } else {
            return `${hour}:${arr[1]} AM`;
        }
    }

    interface RestaurantCardType {
        id: number
        name: string
        main_img: string
    }

    const prisma = new PrismaClient();

    const fetchRestaurant = async (slug: string): Promise<RestaurantCardType> => {
        let restaurant = await prisma.restaurant.findFirst({
            where: {
                slug
            },
            select: {
                id: true,
                name: true,
                main_img: true,
            }
        });
        if (!restaurant) {
            notFound();
        }
        return restaurant;
    }

    const restaurant = await fetchRestaurant(params.reserve_slug);
    return (
        <div>
            <h3 className="font-bold">You're almost done!</h3>
            <div className="mt-5 flex">
                <img
                    src={restaurant.main_img}
                    alt=""
                    className="w-32 h-18 rounded"
                />
                <div className="ml-4">
                    <h1 className="text-3xl font-bold">
                        {restaurant.name}
                    </h1>
                    <div className="flex mt-3">
                        <p className="mr-6">{format(new Date(date), "ccc LLL d")}</p>
                        <p className="mr-6">{convertToDisplayTime(time)}</p>
                        <p className="mr-6">{partySize} people</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
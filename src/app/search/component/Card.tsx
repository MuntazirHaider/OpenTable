import React from 'react'
import Link from 'next/link'
import { Location, PRICE, Region } from '@prisma/client'
import RestaurantPrice from '@/app/component/price'

interface RestaurantType {
    id: number
    name: string
    main_img: string
    price: PRICE
    location: Location
    region: Region
    slug: string
}

const Card = ({ restaurant }: {restaurant: RestaurantType}) => {
    const {id,name,main_img,price,location,region,slug} = restaurant;
    return (
        <div className="w-5/6 ml-2">
            {/* RESAURANT CAR */}
            <div className="border-b flex pb-5">
                <img
                    src={main_img}
                    alt=""
                    className="w-44 rounded"
                />
                <div className="pl-5">
                    <h2 className="text-3xl">{name}</h2>
                    <div className="flex items-start">
                        <div className="flex mb-2">*****</div>
                        <p className="ml-2 text-sm">Awesome</p>
                    </div>
                    <div className="mb-9">
                        <div className="font-light flex text-reg">
                            <RestaurantPrice price={price}/>
                            <p className="mr-4">{region.name}</p>
                            <p className="mr-4">{location.name}</p>
                        </div>
                    </div>
                    <div className="text-red-600">
                        <Link href={`restaurant/${slug}`}>View more information</Link>
                    </div>
                </div>
            </div>
            {/* RESAURANT CAR */}
        </div>
    )
}

export default Card
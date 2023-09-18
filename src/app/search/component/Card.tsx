import React from 'react'
import Link from 'next/link'
import { Location, PRICE, Region, Review } from '@prisma/client'
import RestaurantPrice from '@/app/component/price'
import { log } from 'console'
import RatingText from './RatingText'
import Stars from '@/app/component/Stars'

interface RestaurantType {
    id: number
    name: string
    main_img: string
    price: PRICE
    location: Location
    region: Region
    slug: string
    reviews: Review[]
}

const Card = ({ restaurant }: {restaurant: RestaurantType}) => {
    const {id,name,main_img,price,location,region,slug,reviews} = restaurant;
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRatings / reviews.length : 0;
    
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
                    <div className="flex items-start mt-2">
                        <Stars reviews={reviews} />   
                        <div className="flex mb-2 ml-1">{averageRating.toFixed(1)}</div>
                        <RatingText averageRating={averageRating}/>
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
import React from 'react'
import Header from './component/Header'
import Detail from './component/Detail'
import Reviews from './component/Reviews'
import Reservation from './component/Reservation'
import RestaurantNav from './component/RestaurantNav'
import { PrismaClient, Location, Item, Review } from '@prisma/client'

interface Props {
  params: {
    restaurant_slug: string
  }
}

export interface RestaurantType {
    id: number
    name: string
    images: string[]
    description: string
    location: Location
    slug: string
    items: Item[]
    reviews: Review[]
}

const prisma = new PrismaClient();

const fetchRestaurant = async (slug:string): Promise<RestaurantType> => {
  let restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      location: true,
      slug: true,
      items: true,
      reviews: true
    }
  })

  if(!restaurant) throw new Error("Restaurant Not Found")

  return restaurant;
}

const RestaurantDetailPage = async ({params} : Props) => {
  
  const restaurant = await fetchRestaurant(params.restaurant_slug);
  const {name, location, slug,reviews} = restaurant
  
  return (
    <div>
      <Header name={name} location={location} load={''}/>  
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNav slug={slug}/>
          <Detail restaurant={restaurant}/>
          {reviews.map((review)=>(
            <Reviews review={review}/>
          ))}
        </div>
        <Reservation />
      </div>
    </div>
  )
}

export default RestaurantDetailPage
import React from 'react'
import Header from '../component/Header'
import Menu from './component/Menu'
import RestaurantNav from '../component/RestaurantNav'
import { PrismaClient } from '@prisma/client'
import { RestaurantType } from '../page'

interface Props {
  params: {
    restaurant_slug: string
  }
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
    }
  })

  if(!restaurant) throw new Error()

  return restaurant;
}

const RestaurantPageMenu = async ({params} : Props) => {

  const restaurant = await fetchRestaurant(params.restaurant_slug);
  const {name, location, slug, items} = restaurant;
  

  return (  
    <div>
      <Header name={name} location={location}/>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNav slug={slug}/>
          <Menu items={items}/>
        </div>
      </div>
    </div> 
  )
}

export default RestaurantPageMenu
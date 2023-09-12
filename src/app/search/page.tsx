import React from 'react'
import Header from '../component/Header'
import Sidebar from './component/Sidebar'
import Card from './component/Card'
import { PRICE, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const fetchRestaurant = async (searchTerm: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_img: true,
    price: true,
    location: true,
    region: true,
    slug: true,
  }
  if (!searchTerm) return await prisma.restaurant.findMany({ select })
  let restaurant = await prisma.restaurant.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          location: {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        },
        {
          region: {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        },
        {
          items: {
            some: {
              name: {
              contains: searchTerm,
              mode: 'insensitive'
              }
            }
          }
        }
      ]
    },
    select
  })

  if (!restaurant) throw new Error()

  return restaurant;
}


const SearchPage = async ({ searchParams }: {searchParams: {searchFor?: string, region?: string, city?: string, price?:PRICE}}) => {
  let restaurant = await fetchRestaurant(searchParams.searchFor);
  return (
    <div>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <Sidebar />
        <div className='w-5/6'>
          {restaurant.length ? (
            restaurant.map((restaurant) => (
              <Card restaurant={restaurant} />
            ))
          ) : (
            <h1>Didn't Find Anything 🥲 !!</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
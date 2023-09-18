import React from 'react'
import Header from '../component/Header'
import Sidebar from './component/Sidebar'
import Card from './component/Card'
import { PRICE, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const fetchRestaurant = async (searchParams: { dish?: string; city?: string; region?: string; searchFor?: string; price?: PRICE; }) => {
  const select = {
    id: true,
    name: true,
    main_img: true,
    price: true,
    location: true,
    region: true,
    slug: true,
    reviews: true
  };

  let restaurant;

  // Initialize an empty 'where' object for the Prisma query
  const where: any = {};

  // Handle the 'searchFor' parameter
  if (searchParams.searchFor) {
    const searchForCondition = {
      OR: [
        {
          name: {
            contains: searchParams.searchFor,
            mode: 'insensitive',
          },
        },
        {
          location: {
            name: {
              contains: searchParams.searchFor,
              mode: 'insensitive',
            },
          },
        },
        {
          region: {
            name: {
              contains: searchParams.searchFor,
              mode: 'insensitive',
            },
          },
        },
        {
          items: {
            some: {
              name: {
                contains: searchParams.searchFor,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    };

    // Merge the 'searchFor' condition with other conditions using 'AND'
    Object.assign(where, searchForCondition);
  }

  // Handle the 'dish' parameter
  if (searchParams.dish) {
    where.items = {
      some: {
        name: {
          contains: searchParams.dish,
          mode: 'insensitive',
        },
      },
    };
  }

  // Handle the 'city' parameter
  if (searchParams.city) {
    where.location = {
      name: {
        contains: searchParams.city,
        mode: 'insensitive',
      },
    };
  }

  // Handle the 'region' parameter
  if (searchParams.region) {
    where.region = {
      name: {
        contains: searchParams.region,
        mode: 'insensitive',
      },
    };
  }

  // Handle the 'price' parameter
  if (searchParams.price) {
    where.price = searchParams.price;
  }

  // Perform the search using the constructed 'where' object
  restaurant = await prisma.restaurant.findMany({
    where,
    select,
  });

  if (!restaurant) throw new Error();

  return restaurant;
};



const SearchPage = async ({ searchParams }: { searchParams: { searchFor?: string, region?: string, city?: string, price?: PRICE } }) => {
  console.log(searchParams);

  let restaurant = await fetchRestaurant(searchParams);
  
  
  return (
    <div>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <Sidebar searchParams={searchParams} />
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
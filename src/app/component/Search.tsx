"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SearchPage = () => {

    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleChange = (e: any) => {
        setSearch(e.target.value)
    }

    const handleClick = () => {
        if(search === "") return null;
        router.push(`/search?searchFor=${search}`);
        setSearch('');
    }

    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
                className="rounded  mr-3 p-2 w-[450px]"
                type="text"
                placeholder="City, town, restaurant or dish"
                onChange={handleChange}
                value={search}
            />
                <button className="rounded bg-red-600 px-9 py-2 text-white" onClick={handleClick}>
                    Let's go
                </button>
        </div>
    )
}

export default SearchPage


















/* 
"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PrismaClient } from '@prisma/client';

const SearchPage = () => {

    const [search, setSearch] = useState("");
    const router = useRouter();
    const prisma = new PrismaClient();

    const fetchQueryType = async (search: string) => {

        let result: String = ''
      
        if (search) {
      
          // Check if the search term matches any table
          const locations = await prisma.location.findMany({
            where: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          });
      
          const regions = await prisma.region.findMany({
            where: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          });
      
          const restaurants = await prisma.restaurant.findMany({
            where: {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
          });
      
          const items = await prisma.item.findMany({
            where: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          });
      
          if (locations.length > 0) {
            result = 'city';
          } else if (regions.length > 0) {
            result = 'region';
          } else if (restaurants.length > 0) {
            result = 'restaurant';
          } else if (items.length > 0) {
            result = 'dish';
          }
        }
      
        return result;
      };

    const handleChange = (e: any) => {
        setSearch(e.target.value)
    }

    const handleClick = () => {
        if(search === "") return null;
        const query = fetchQueryType(search)
        router.push(`/search?${query}=${search}`);
        setSearch('');
    }

    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
                className="rounded  mr-3 p-2 w-[450px]"
                type="text"
                placeholder="City, town, restaurant or dish"
                onChange={handleChange}
                value={search}
            />
                <button className="rounded bg-red-600 px-9 py-2 text-white" onClick={handleClick}>
                    Let's go
                </button>
        </div>
    )
}

export default SearchPage
*/
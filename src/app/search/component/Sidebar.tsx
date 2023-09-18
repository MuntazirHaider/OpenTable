import React from 'react'
import { PRICE, PrismaClient } from '@prisma/client'
import Link from 'next/link';

interface List {
    name: string
}

const prisma = new PrismaClient();

const fetchLocation = async (): Promise<List[]> => {
    const locations = await prisma.location.findMany({ select: { name: true } });
    return locations;
}

const fetchRegion = async () => {
    const regions = await prisma.region.findMany({ select: { name: true } });
    return regions;
}

const fetchItem = async () => {
    const items = await prisma.item.findMany({ select: { name: true } });
    return items;
}

const Sidebar = async ({ searchParams }: {searchParams: {searchFor?: string, region?: string, city?: string, price?:PRICE}}) => {
    const locations = await fetchLocation();
    const regions = await fetchRegion();
    const items = await fetchItem();

    return (
        <div className="w-1/5">
            <div className="border-b pb-4">
                <h1 className="mb-2">Location</h1>
                <div className='flex flex-col'>
                {
                    locations.map((location) => (
                        <Link href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                city: location.name}
                        }} className="font-light text-reg capitalize">{location.name}</Link>
                    ))
                }
                </div>
            </div>
            <div className="border-b pb-4 mt-3">
                <h1 className="mb-2">Region</h1>
                <div className='flex flex-col'>
                {
                    regions.map((region) => (
                        <Link href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                region: region.name}
                        }} className="font-light text-reg capitalize">{region.name}</Link>
                    ))
                }
                </div>
            </div>
            <div className="border-b pb-4 mt-3">
                <h1 className="mb-2">Dishes</h1>
                <div className='flex flex-col'>
                {
                    items.map((item) => (
                        <Link href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                dish: item.name}
                        }}  className="font-light text-reg capitalize">{item.name}</Link>
                    ))
                }
                </div>
            </div>
            <div className="mt-3 pb-4 mr-1">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    <Link  href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                price: PRICE.Cheap}
                        }} className="border w-full text-reg font-light rounded-l p-2">
                        $
                    </Link>
                    <Link  href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                price: PRICE.Regular}
                        }}
                        className="border-r border-t border-b w-full text-reg font-light p-2"
                    >
                        $$
                    </Link>
                    <Link  href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                price: PRICE.Expensive}
                        }}
                        className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
                    >
                        $$$
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
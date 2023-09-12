import React from 'react'
import { PrismaClient } from '@prisma/client'

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

const Sidebar = async () => {
    const locations = await fetchLocation();
    const regions = await fetchRegion();
    const items = await fetchItem();

    return (
        <div className="w-1/5">
            <div className="border-b pb-4">
                <h1 className="mb-2">Location</h1>
                {
                    locations.map((location) => (
                        <p className="font-light text-reg capitalize">{location.name}</p>
                    ))
                }
            </div>
            <div className="border-b pb-4 mt-3">
                <h1 className="mb-2">Region</h1>
                {
                    regions.map((region) => (
                        <p className="font-light text-reg capitalize">{region.name}</p>
                    ))
                }
            </div>
            <div className="border-b pb-4 mt-3">
                <h1 className="mb-2">Dishes</h1>
                {
                    items.map((item) => (
                        <p className="font-light text-reg capitalize">{item.name}</p>
                    ))
                }
            </div>
            <div className="mt-3 pb-4 mr-1">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    <button className="border w-full text-reg font-light rounded-l p-2">
                        $
                    </button>
                    <button
                        className="border-r border-t border-b w-full text-reg font-light p-2"
                    >
                        $$
                    </button>
                    <button
                        className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
                    >
                        $$$
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
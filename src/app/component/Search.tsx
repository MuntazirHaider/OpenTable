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
import React from 'react'
import Link from 'next/link'

const RestaurantNav = () => {
  return (
    <nav className="flex text-reg border-b pb-2">
            <Link href="/restaurant/KFC" className="mr-7"> Overview </Link>
            <Link href="/restaurant/KFC/menu" className="mr-7"> Menu </Link>
    </nav>
  )
}

export default RestaurantNav
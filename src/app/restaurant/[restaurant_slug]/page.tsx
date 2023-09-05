import React from 'react'
import Header from './component/Header'
import Detail from './component/Detail'
import Reviews from './component/Reviews'
import Reservation from './component/Reservation'
import RestaurantNav from './component/RestaurantNav'

const RestaurantDetailPage = () => {
  return (
    <div>
      <Header />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNav />
          <Detail />
          <Reviews />
        </div>
        <Reservation />
      </div>
    </div>
  )
}

export default RestaurantDetailPage
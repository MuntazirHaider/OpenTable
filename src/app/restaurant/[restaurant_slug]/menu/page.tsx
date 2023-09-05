import React from 'react'
import Header from '../component/Header'
import Menu from './component/Menu'
import RestaurantNav from '../component/RestaurantNav'

const RestaurantPageMenu = () => {
  return (  
    <div>
      <Header />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNav />
          <Menu />
        </div>
      </div>
    </div>
  )
}

export default RestaurantPageMenu
import { PRICE } from '@prisma/client'
import React from 'react'

const RestaurantPrice = ({price}: {price:PRICE}) => {
    
  
    const restaurantPrice = () => {
        if (price === PRICE.Cheap) {
            return (
                <>
                <span>$$</span> <span className="text-gray-400">$$</span>
                </>
            )
        } else if (price === PRICE.Regular) {
            return (
                <>
                <span>$$$</span> <span className="text-gray-400">$</span>
                </>
            )
        }else{
            return (
                <>
                <span>$$$$</span> 
                </>
            )
        }
    }

    return (
        <p className='flex mr-3'>{restaurantPrice()}</p>
    );
}

export default RestaurantPrice
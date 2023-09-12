import React from 'react'
import {RestaurantType} from '../page'

interface Props {
    restaurant: RestaurantType 
}

const Detail = ({restaurant}:Props) => {
    const {id, name, images, description} = restaurant;
    
    return (
        <div>
            <div className="mt-4 border-b pb-6">
                <h1 className="font-bold text-6xl">{name}</h1>
            </div>
            {/* TITLE */} {/* RATING */}
            <div className="flex items-end">
                <div className="ratings mt-2 flex items-center">
                    <p>*****</p>
                    <p className="text-reg ml-3">4.9</p>
                </div>
                <div>
                    <p className="text-reg ml-4">600 Reviews</p>
                </div>
            </div>
            {/* RATING */} {/* DESCRIPTION */}
            <div className="mt-4">
                <p className="text-lg font-light">
                   {description}
                </p>
            </div>
            {/* DESCRIPTION */} {/* IMAGES */}
            <div>
                <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                    <span>{images.length}</span> photos
                </h1>
                <div className="flex flex-wrap">
                    {images.map((img)=>(
                        <img
                        className="w-56 h-44 mr-1 mb-1"
                        src={img}
                        alt=""
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Detail
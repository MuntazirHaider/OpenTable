import React from 'react'
import {RestaurantType} from '../page'
import Stars from '@/app/component/Stars';

interface Props {
    restaurant: RestaurantType
}


const Detail = ({restaurant}:Props) => {
    const {id, name, images, description, reviews} = restaurant;
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRatings / reviews.length : 0;
    
    
    return (
        <div>
            <div className="mt-4 border-b pb-6">
                <h1 className="font-bold text-6xl">{name}</h1>
            </div>
            {/* TITLE */} {/* RATING */}
            <div className="flex items-end">
                <div className="ratings mt-2 flex items-center">
                    <Stars reviews={reviews}/>
                    <p className="text-reg ml-3">{averageRating.toFixed(1)}</p>
                </div>
                <div>
                    <p className="text-reg ml-4">{reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}</p>
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
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                {reviews.length ? "What Others peoples are saying" : ''}
            </h1>
        </div>
    )
}

export default Detail
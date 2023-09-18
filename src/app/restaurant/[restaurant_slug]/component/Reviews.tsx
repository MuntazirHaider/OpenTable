import Stars from '@/app/component/Stars';
import { Review } from '@prisma/client'
import React from 'react'

const Reviews = ({review}: {review: Review}) => {
    const {name,comment} = review;
    const str = name.split(' ');
    const first = str[0].charAt(0);
    const second = str[1].charAt(0);
    return (
        <div>
            <div>
                {/* REVIEW CARD */}
                <div className="border-b pb-7 mb-7">
                    <div className="flex">
                        <div className="w-1/6 flex flex-col items-center">
                            <div
                                className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center"
                            >
                                <h2 className="text-white text-2xl">{first}{second}</h2>
                            </div>
                            <p className="text-center">{name}</p>
                        </div>
                        <div className="ml-10 w-5/6">
                            <div className="flex items-center">
                                <Stars rating={review.rating} reviews={[]}/> 
                            </div>
                            <div className="mt-5">
                                <p className="text-lg font-light">
                                   {comment}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* REVIEW CARD */}
            </div>
        </div>
    )
}

export default Reviews
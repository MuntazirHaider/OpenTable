import React from 'react'
import FullStar from "../../../public/icons/full-star.png";
import HalfStar from "../../../public/icons/half-star.png";
import EmptyStar from "../../../public/icons//empty-star.png";
import Image from 'next/image';
import { Review } from '@prisma/client';
import { log } from 'console';

const Stars = ({ reviews, rating }: { reviews: Review[], rating?: number }) => {
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    
    const StarRating = () => {
        
        const ratingStar = rating || (reviews.length > 0 ? totalRatings / reviews.length : 0);
        const stars = [];

        for (let i = 0; i < 5; i++) {
            const difference = parseFloat((ratingStar-i).toFixed(1));

            if (difference >= 1) {
                stars.push(FullStar);
            }else if(difference > 0 && difference < 1){
                stars.push(HalfStar)
            }else{
                stars.push(EmptyStar);
            }
        }

        return stars.map((star)=>(
            <Image src={star} alt='Unable to display !!' className='w-4 h-4 mr-1'/>
        ))

    }

    return (
        <div className='flex'>
            {StarRating()}
        </div>
    )
}

export default Stars
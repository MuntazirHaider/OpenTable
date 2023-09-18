import React from 'react';

const RatingText: React.FC<{ averageRating: number }> = ({ averageRating }) => {
    
    const sign = () => {
            if (averageRating < 3 || averageRating === 3) {
                return (
                    <p className="ml-2 text-sm">Tasty 😊</p>
                )
            } else if (averageRating < 4 || averageRating === 4) {
                return (
                    <p className="ml-2 text-sm">Delecious 😘</p>
                )
            } else {
                return (
                    <p className="ml-2 text-sm">Heavenly 😍</p>
                )
            }
        }
        return (
            <p className="ml-2 text-sm">{sign()}</p>
    );
};

export default RatingText;

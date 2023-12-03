'use client'
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react'

const useReservation = () => {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);


    const createReservation = async ({
        slug,
        partySize,
        date,
        time,
        name,
        email,
        phone,
        occasion,
        request,
        setdidBook
    }: {
        slug: string,
        partySize: string,
        date: string,
        time: string,
        name: string,
        email: string,
        phone: string,
        occasion: string,
        request: string,
        setdidBook: Dispatch<SetStateAction<boolean>>
    }) => {
        setloading(true);
        date = date.split("T")[0];
        try {
            const response = await axios.post(`http://localhost:3000/api/restaurant/${slug}/reserve`, {
                name,
                email,
                phone,
                occasion,
                request
            }, {
                params: {
                partySize,
                date,
                time
                }
            });
            setloading(false);
            setdidBook(true);
            return response;
        } catch (error: any) {
            setloading(false);
            seterror(error.response.data.Error);
        }
    }

    return { loading, error, createReservation }
}

export default useReservation
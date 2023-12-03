'use client'
import axios from "axios";
import { log } from "console";
import { useState } from "react";

export default function useAvailabilities() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{time: string; available: boolean}[] | null>();
    const [error, setError] = useState<boolean | string>(false);

    const fetchAvailabilities = async ({ slug, partySize, date, time }: {
        slug: string,
        partySize: string,
        date: string,
        time: string,
    }) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability`, {
                params: {
                    partySize,
                    time,
                    date
                }
            });
            setData(response.data.availabilities);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.response.data.Error)
            console.log(error);
        }
    }

    return {loading,data,error,fetchAvailabilities};
}
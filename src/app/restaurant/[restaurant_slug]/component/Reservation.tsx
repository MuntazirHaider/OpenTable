'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { partySize, times } from "@/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAvailabilities from '@/hooks/useAvailabilities';
import { CircularProgress } from '@mui/material';



const Reservation = ({ openTime, closeTime, slug }: {
    openTime: string,
    closeTime: string,
    slug: string
}) => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const { loading, data, error, fetchAvailabilities } = useAvailabilities();

    const partyRef = useRef<HTMLSelectElement>(null);
    const timeRef = useRef<HTMLSelectElement>(null);

    const filterTime = () => {
        let open, close;
        for (let i = 0; i < times.length; i++) {
            if (times[i].time === openTime) {
                open = i;
            } else if (times[i].time === closeTime) {
                close = i + 1;
            }
        }
        return times.slice(open, close);
    }

    const onSubmit = () => {
        fetchAvailabilities({
            slug,
            partySize: String(partyRef.current?.value),
            time: String(timeRef.current?.value),
            date: String(startDate?.toISOString().split("T")[0]),
        })
    }

    console.log("Available data", data);

    const convertToDisplayTime = (time: string) => {
        const arr = time.split(':');
        const hour = Number(arr[0]);
        
        if (hour >= 12) {
            const displayHour = hour > 12 ? hour - 12 : 12;
            return `${displayHour}:${arr[1]} PM`;
        } else {
            return `${hour}:${arr[1]} AM`;
        }
    }
    

    return (
        <div className="w-[27%] relative text-reg">
            <div className=" bg-white rounded p-3 shadow">
                <div className="text-center border-b pb-2 font-bold">
                    <h4 className="mr-7 text-lg">Make a Reservation</h4>
                </div>
                <div className="my-3 flex flex-col">
                    <label htmlFor="">Party size</label>
                    <select name="" className="py-3 border-b font-light" id="" ref={partyRef}>
                        {partySize.map((party) => (
                            <option value={party.value} key={party.value}>{party.label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="">Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className='py-3 w-28 border-b font-light text-reg'
                            dateFormat="MMM d"
                            minDate={new Date()}
                        />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="">Time</label>
                        <select name="" id="" className="py-3 border-b font-light" ref={timeRef}>
                            {filterTime().map((time) => (
                                <option value={time.time} key={time.time}>{time.displayTime}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    {/* <Link href="/reserve/KFC"> */}
                    <button
                        className="bg-red-600 rounded w-full px-4 text-white font-bold h-16 disabled:bg-grey-600"
                        onClick={onSubmit}
                        disabled={loading}
                    >
                        {loading ? (<CircularProgress color='inherit' />) : ("Find a Time")}
                    </button>
                    {/* </Link> */}
                </div>
                {
                    data && data.length ? (
                        <div className='mt-4'>
                            <p className='text-reg'>Select Time</p>
                            <div className='flex flex-wrap mt-2'>
                                {data.map((item) => (
                                    item.available ? (
                                        <Link href={`/reserve/${slug}?partySize=${partyRef.current?.value}&date=${startDate?.toISOString()}&time=${timeRef.current?.value}`} className='bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 mr-3 rounded'>
                                            {convertToDisplayTime(item.time)}
                                        </Link>
                                    ) : (
                                        <div className='bg-gray-400 cursor-pointer p-5 w-24 mb-3 mr-3 rounded border-grey-600'></div>
                                    )
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )
                }

            </div>
        </div>
    )
}

export default Reservation
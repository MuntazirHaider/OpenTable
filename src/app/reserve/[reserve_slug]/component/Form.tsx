"use client";
import { SubmitHandler, useForm } from "react-hook-form"
import {useState} from 'react'
import useReservation from "@/hooks/useReservation";
import { searchParams } from "../page";
import { CircularProgress } from "@mui/material";

interface FormData {
    "name": string
    "email": string
    "phone": string
    "occasion": string
    "request": string
}


const Form = ({ slug, searchParams }: { slug: string, searchParams: searchParams }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { createReservation, loading } = useReservation();
    const [didBook, setdidBook] = useState(false);

    const submitHandler: SubmitHandler<FormData> = async (Formdata) => {
        const data = await createReservation({
            slug,
            ...searchParams,
            ...Formdata,
            setdidBook
        })
    }

    return (
        <>
        {didBook ? (
                <>
                {/* component */}
                <div className="bg-gray-100 h-screen">
                  <div className="bg-white p-6  md:mx-auto">
                    <svg
                      viewBox="0 0 24 24"
                      className="text-green-600 w-16 h-16 mx-auto my-6"
                    >
                      <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                      ></path>
                    </svg>
                    <div className="text-center">
                      <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Booked!
                      </h3>
                      <p className="text-gray-600 my-2">
                        Thank you for be our customer.
                      </p>
                      <p> Have a great day!</p>
                      <div className="py-10 text-center">
                        <a
                          href="/"
                          className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                        >
                          GO BACK
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
                <><input
                type="text"
                className={`border ${errors.name ? "border-red-500" : ""} rounded p-3 w-[100%] mb-4`}
                placeholder="Full name"
                {...register("name", { required: "Please Enter Your Name", pattern: /^[a-zA-Z\s]+$/, minLength: 2 })}
                required
            />
            <input
                type="text"
                className={`border ${errors.email ? "border-red-500" : ""} rounded p-3 w-[100%] mb-4`}
                placeholder="Email"
                {...register("email", { required: "Please Enter Your Email", pattern: /^\S+@\S+$/i })}
                required
            />
            <input
                type="text"
                className={`border ${errors.phone ? "border-red-500" : ""} rounded p-3 w-80 mb-4`}
                placeholder="Phone number"
                {...register("phone", { required: "Please Enter Your Phone Number", pattern: /^[0-9+-]+$/, maxLength: 10, minLength: 10 })}
            />
            <input
                type="text"
                className="border rounded p-3 w-80 mb-4"
                placeholder="Occasion (optional)"
                {...register("occasion")}
            />
            <input
                type="text"
                className="border rounded p-3 w-[100%] mb-4"
                placeholder="Requests (optional)"
                {...register("request")}
            />
            <button
                className={`bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300 ${loading ? "bg-gray-300" : ""}`}
                onClick={handleSubmit(submitHandler)}
                disabled={loading}
            >
                {loading ? <CircularProgress color="inherit" /> : "Complete reservation"}
            </button>
            <p className="mt-4 text-sm">
                By clicking “Complete reservation” you agree to the OpenTable Terms
                of Use and Privacy Policy. Standard text message rates may apply.
                You may opt out of receiving text messages at any time.
            </p></>
            </div>
            )
            }
        </>
    )
}

export default Form
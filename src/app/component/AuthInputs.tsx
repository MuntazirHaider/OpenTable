import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

const AuthInputs = ({register,errors}: {register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>}) => {
  return (
    <div>
      <div className='my-3 flex text-sm w-full'>
        <input type="text"
        className={`border ${errors.name ? "border-red-500" : ""} rounded p-2 py-3 w-full`}
        placeholder='Name'
        {...register("name", { required: true, pattern: /^[a-zA-Z]+$/ })}
         />
      </div>
      <div className='my-3 flex justify-between text-sm'>
        <input type="text"
        className={`border ${errors.name ? "border-red-500" : ""} rounded p-2 py-3 w-[49%]`}
        placeholder='City'
        {...register("city", { required: true, pattern: /^[a-zA-Z]+$/ })}
         />
        <input type="number"
        className={`border ${errors.name ? "border-red-500" : ""} rounded p-2 py-3 w-[49%]`}
        placeholder='Phone'
        {...register("phone", { required: true, pattern:/^[0-9+-]+$/ })}
         />
      </div>
      <div className='my-3 flex text-sm w-full'>
        <input type="email"
        className={`border ${errors.name ? "border-red-500" : ""} rounded p-2 py-3 w-full`}
        placeholder='Email'
        {...register("email", { required: true,pattern: /^\S+@\S+$/i })}
         />
      </div>
      <div className='my-3 flex text-sm w-full'>
        <input type="password"
        className={`border ${errors.name ? "border-red-500" : ""} rounded p-2 py-3 w-full`}
        placeholder='Password'
        {...register("password", { required: true, minLength: 6 })}
         />
      </div>
    </div>
  )
}

export default AuthInputs
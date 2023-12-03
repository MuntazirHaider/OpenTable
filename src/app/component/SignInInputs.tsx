import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

const SignInInputs = ({register,errors}: {register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>}) => {
  return (
    <div className='h-96'>
    <div className='my-3 flex text-sm w-full'>
      <input type="email"
      className={`border ${errors.email ? "border-red-500" : ""}rounded p-2 py-3 w-full`}
      placeholder='Email'
      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
       />
    </div>
    <div className='my-3 flex text-sm w-full'>
      <input type="password"
      className={`border ${errors.password ? "border-red-500" : ""}rounded p-2 py-3 w-full`}
      placeholder='Password'
      {...register("password", { required: true, minLength: 6 })}
       />
    </div>
  </div>
  )
}

export default SignInInputs
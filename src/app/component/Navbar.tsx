'use client'
import React from 'react'
import Link from 'next/link'
import AuthForm from './AuthForm'
import useAuthContext from '@/hooks/useAuthContext'
import { Button } from '@mui/material'
import useAuth from '@/hooks/useAuth'

const Navbar = () => {
  const {data,loading} = useAuthContext();
  const {logout} = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
      <div>
        {loading ? null : (
          <div className="flex">
          {data ? (
            <button className='uppercase bg-red-600 w-full text-white p-2 rounded text-sm mt-1 disabled:bg-grey-400' onClick={logout}>Logout</button>
          ) : (
            <>
            <AuthForm isSignIn={true}/>
          <AuthForm isSignIn={false}/>
            </>
          )}
        </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
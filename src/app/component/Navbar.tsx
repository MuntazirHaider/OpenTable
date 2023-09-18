import React from 'react'
import Link from 'next/link'
import AuthForm from './AuthForm'

const Navbar = () => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
      <div>
        <div className="flex">
          <AuthForm isSignIn={true}/>
          <AuthForm isSignIn={false}/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
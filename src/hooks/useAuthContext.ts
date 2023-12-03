
import { AuthenticationContext } from '@/app/context/AuthContext'
import React, { useContext } from 'react'

const useAuthContext = () => {
    const {loading,data,error,setAuthState} = useContext(AuthenticationContext)
  return {loading,data,error,setAuthState}
}

export default useAuthContext
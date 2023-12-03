'use client'
import { ReactNode, useState, createContext, Dispatch, SetStateAction,useEffect } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'

interface User {
    id: number
    name: string
    city: string
    phone: string
    email: string
}

interface State {
    loading: boolean
    data: null | User
    error: null | string
}

interface AuthState extends State {
    setAuthState: Dispatch<SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => { }
})

const AuthContext = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null,
        error: null
    })

 const fetchUser = async() => {
    setAuthState({
        loading: true,
        data: null,
        error: null,
    })
    try {
        const jwt = getCookie('JWT');

        if (!jwt) {
            setAuthState({
                loading: false,
                data: null,
                error: null,
            })
        }else{
            const response = await axios.get('http://localhost:3000/api/auth/user', {
                headers: {
                    Authorization: jwt,
                }
            })
            setAuthState({
                loading: false,
                data: response.data,
                error: null,
            })
        }

        axios.defaults.headers.common["Authorization"] = jwt;

    } catch (error: any) {
        setAuthState({
            loading: false,
            data: null,
            error: error.response.data.Error,
        })
    }
 }  
    
useEffect(() => {
  fetchUser();
}, [])


    return (
        <AuthenticationContext.Provider value={{
            ...authState,
            setAuthState
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthContext
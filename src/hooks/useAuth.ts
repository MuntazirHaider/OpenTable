import axios from "axios";
import useAuthContext from "./useAuthContext";
import { deleteCookie } from "cookies-next";

const useAuth = () => {

    const {loading,data,error,setAuthState} = useAuthContext();

    const signin = async (data: any) => {
        setAuthState({
            loading: true,
            data: null,
            error: null,
        })
        try {
            const host = "http://localhost:3000/api/auth";
            const res = await axios.post(`${host}/signin`, {
                email: data.email,
                password: data.password
            })
            setAuthState({
                loading: false,
                data: res.data,
                error: null,
            })
        } catch (error:any) {
            console.log(error);
            setAuthState({
                loading: false,
                data: null,
                error: error.response.data.Error,
            })
        }
    }

    const signup = async(data: any) => {
        try {
            const host = "http://localhost:3000/api/auth";
            const res = await axios.post(`${host}/signup`, {
                name: data.name,
                city: data.city,
                phone: data.phone,
                email: data.email,
                password: data.password
            })
            console.log("User Created",res.data);
            
        } catch (error) {
            console.log("Use Auth", error);
        }
    }

    const logout = () => {
        deleteCookie('JWT');
        setAuthState({
            loading: false,
            data: null,
            error: null,
        })
    }
    return {
        signin,
        signup,
        logout
    }
}

export default useAuth;
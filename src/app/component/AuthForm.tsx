'use client'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthInputs from './AuthInputs';
import SignInInputs from './SignInInputs';
import { useForm } from "react-hook-form"
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import useAuthContext from '@/hooks/useAuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AuthForm({ isSignIn }: { isSignIn: boolean }) {


    const { loading, data, error } = useAuthContext();
    const [open, setOpen] = useState(false);
    const { signin, signup } = useAuth();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const renderContent = (signInContent: string, signUpContent: string) => {
        return isSignIn ? signInContent : signUpContent;
    }

    const onSubmit = (data: any) => {
        isSignIn ? signin(data) : signup(data)
    }

    return (
        <div>
            <button onClick={handleOpen} className={`${renderContent("bg-blue-400 text-white", "")} border p-1 px-4 rounded mr-3`}>
                {renderContent("Sign in", "Sign up")}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loading ? (
                        <div className='h- flex justify-center py-28'>
                            <CircularProgress/>
                        </div>
                    ) : (
                        <div className='p-2'>
                            {error ? (
                                <Alert severity="error" className='mb-3'>{error}</Alert>
                            ) : null}
                            <div className='uppercase font-bold text-center pb-2 border-b mb-3ee499'>
                                <p className='text-sm'>
                                    {renderContent("Sign in", "Create Account")}
                                </p>
                            </div>
                            <div className='m-auto'>
                                <h2 className='text-2xl font-light text-center'>
                                    {renderContent("Log Into Your Account", "Create Your Account")}
                                </h2>
                            </div>
                            {isSignIn ? <SignInInputs register={register} errors={errors} /> : <AuthInputs register={register} errors={errors} />}
                            <button onClick={handleSubmit(onSubmit)} className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 mt-1 disabled:bg-grey-400'>
                                {renderContent("Sign In", "Create Account")}
                            </button>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

import type { FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input, message } from 'antd';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { Button, OutlineButton } from '../../components/index';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { GoogleLogin, CredentialResponse, useGoogleLogin, CodeResponse } from '@react-oauth/google';
import { useAppDispatch } from '../../redux/actionTypes';
import { userLogin } from '../../actions/user';

const LoginForm: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control, getValues } = useForm<UserFormType>();
    const onSubmit: SubmitHandler<UserFormType> = (data) => {
        console.log(data);
    }

    const handleGoogleLogin = useGoogleLogin({
        scope: 'email profile',
        onSuccess: async (response) => {
            handleLogin(response);
        },
        onError: (errorResponse) => {
            console.log(errorResponse);
            message.error('Google login failed');
        },
        flow: 'auth-code'
    });

    const handleLogin = async (response: CodeResponse | null = null) => {
        const userData: UserFormType = {
            user_email: getValues('user_email'),
            user_pw:  getValues('user_pw')
        };

        const loginDispatch = userLogin(userData, response);
        await loginDispatch(dispatch);
        
        message.success('User logged in successfully');
        navigate('/');
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-3'>
                <div className='w-full'>
                    <div className='max-w-xs mx-auto'>
                        <Controller 
                            name='user_email' 
                            control={control} 
                            rules={{ 
                                required: true,
                                pattern:  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,                     
                            }} 
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type='email' 
                                    placeholder='email' 
                                    className='h-12 placeholder-stone-400' 
                                />
                            )}
                        />
                        <p className='h-6 text-xs font-semibold text-left text-red-600'>
                            {
                                errors.user_email?.type === 'required' ? (
                                    'email is required.'
                                ) : errors.user_email?.type === 'pattern' ? (
                                    'email is not valid.'
                                ) : ''
                            }
                        </p> 
                    </div>                
                </div>            
                <div className='w-full'>
                    <div className='max-w-xs mx-auto'>
                        <Controller 
                            name='user_pw' 
                            control={control}
                            rules={{ 
                                required: true,
                                pattern:  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,20}$/,                     
                            }} 
                            render={
                                ({ field }) => (
                                    <Input.Password 
                                        {...field}
                                        placeholder='password' 
                                        className='h-12 placeholder-stone-400'                               
                                    />
                                )
                            }
                        />  
                        <p className='h-6 text-xs font-semibold text-left text-red-600'>
                            {
                                errors.user_pw?.type === 'required' ? (
                                    'password is required.'
                                ) : errors.user_pw?.type === 'pattern' ? (
                                    'Please enter at least 9 digits or English.'
                                ) : ''
                            }
                        </p>            
                    </div>                  
                </div>                  
                <div className='w-full max-w-xs mx-auto '>
                    <Button className='w-full'>
                        Login
                    </Button>
                    {/* <div className='flex justify-center'>
                        <GoogleLogin 
                            onSuccess={handleGoogleLogin}
                            onError={handleGoogleError}
                            shape='pill'            
                        /> 
                    </div>*/}
                </div>             
            </form>
            <div className='max-w-xs mx-auto mt-1.5 flex flex-col gap-2'>
                <OutlineButton onClick={() => handleGoogleLogin()} className='w-full'>
                    <AiOutlineGooglePlus className='text-2xl' />
                    Google
                </OutlineButton>   
                <div className='flex justify-end'>
                    <Link to='/signUp' className='text-sm font-thin border-b border-b-black hover:font-bold'>
                        Go to Sign Up
                    </Link>
                </div>             
            </div>           
          
        </>
    );
};

export default LoginForm;
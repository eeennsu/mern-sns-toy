import type { FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input, message } from 'antd';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { Button, OutlineButton } from '../../components/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../redux/actionTypes';
import { userGoogleLogin, userNormalLogin } from '../../actions/user';
import { useEffect } from 'react';

const LoginForm: FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const dispatch = useAppDispatch();
    const searchedPosts = useAppSelector(state => state.posts.searchedPosts);

    const { handleSubmit, formState: { errors }, control, setValue } = useForm<UserLoginFormType>();
    const onSubmit: SubmitHandler<UserLoginFormType> = async (userData) => {
        const loginDispatch = userNormalLogin(userData);
        await loginDispatch(dispatch);
        
        loginSuc();
    }

    const locationState = location.state;

    useEffect(() => {
        // 방금 회원가입에 성공한 유저라면? 이메일 자동완성
        if (locationState?.signUpedEmail) {
            setValue('email', locationState.signUpedEmail);
        }

        //eslint-disable-next-line
    }, [locationState]);

    const handleGoogleLogin = useGoogleLogin({
        scope: 'email profile',
        onSuccess: async (response) => {
            console.log(response);
            const googleLoginDispatch = userGoogleLogin(response);
            await googleLoginDispatch(dispatch);
            
            loginSuc();
        },
        onError: (errorResponse) => {
            console.log(errorResponse);
            message.error('Google login failed');
        },
        flow: 'implicit'
    });

    const loginSuc = () => {
        message.success('User logged in successfully');
        navigate('/');
    }

    const handleSignUpPage = () => {
        searchedPosts.length >= 1 && dispatch({ type: 'SEARCH_POSTS', payload: [] })
        navigate('/signUp');
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-3'>
                <div className='w-full'>
                    <div className='max-w-xs mx-auto'>
                        <Controller 
                            name='email' 
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
                                errors.email?.type === 'required' ? (
                                    'email is required.'
                                ) : errors.email?.type === 'pattern' ? (
                                    'email is not valid.'
                                ) : ''
                            }
                        </p> 
                    </div>                
                </div>            
                <div className='w-full'>
                    <div className='max-w-xs mx-auto'>
                        <Controller 
                            name='password' 
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
                                errors.password?.type === 'required' ? (
                                    'password is required.'
                                ) : errors.password?.type === 'pattern' ? (
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
                    <p onClick={handleSignUpPage} className='text-sm font-thin border-b border-b-black hover:font-bold'>
                        Go to Sign Up
                    </p>
                </div>             
            </div>          
        </section>
    );
};

export default LoginForm;
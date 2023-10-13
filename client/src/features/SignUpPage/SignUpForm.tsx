import type { FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from 'antd';
import Button from '../../components/commons/Button';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import OutlineButton from '../../components/commons/OutlineButton';
import { Link } from 'react-router-dom';

type UserFormType = {
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_pw: string;
}

const SignUpForm: FC = () => {

    const { register, setValue, handleSubmit, formState: { errors }, control } = useForm<UserFormType>();
    const onSubmit: SubmitHandler<UserFormType> = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-3'>
            <div className='w-full'>
                <div className='max-w-xs mx-auto'>
                    <div className='flex gap-4 '>
                        <Controller 
                            name='user_first_name' 
                            control={control} 
                            rules={{ 
                                required: true,                                     
                            }} 
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type='text' 
                                    placeholder='First Name*' 
                                    className='h-12' 
                                />
                            )}
                        />
                        <Controller 
                            name='user_last_name' 
                            control={control} 
                            rules={{ 
                                required: true,
                                pattern:  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,                     
                            }} 
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type='text' 
                                    placeholder='Last Name*' 
                                    className='h-12' 
                                />
                            )}
                        />
                    </div>                    
                    <p className='h-8 text-sm font-semibold text-left text-red-600'>
                        {
                            errors.user_first_name?.type === 'required' ? (
                                'first name is required.'
                            ) : errors.user_last_name?.type === 'required'
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
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,20}$/,                     
                        }} 
                        render={
                            ({ field }) => (
                                <Input 
                                    {...field}  
                                    type='password' 
                                    placeholder='password' 
                                    className='h-12 max-w-xs'
                                />
                            )
                        }
                    />  
                     <p className='h-8 text-sm font-semibold text-left text-red-600'>
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
            <div className='flex flex-col w-full gap-4 px-6'>
                <Button>
                    Login
                </Button>
                <OutlineButton>
                    <AiOutlineGooglePlus className='text-2xl' />
                    Google
                </OutlineButton>
                <div className='flex justify-end'>
                    <Link to='/signUp' className='text-sm font-thin border-b border-b-black hover:font-bold'>
                        Go to Sign Up
                    </Link>
                </div>
            </div>             
        </form>
    );
};

export default SignUpForm;
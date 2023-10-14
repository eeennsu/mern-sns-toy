import type { FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Checkbox, Input, Select, message } from 'antd';
import { Button, OutlineButton } from '../../components/index';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { emailSelectOptions } from '../../constants/SignUpPage';

type UserFormType = {
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    email_domain: string;
    user_pw: string;
    user_pw_match: string;
    terms_check: boolean;
}

const SignUpForm: FC = () => {

    const { handleSubmit, formState: { errors }, control, watch } = useForm<UserFormType>();
    const onSubmit: SubmitHandler<UserFormType> = (data) => {
        if (!data.terms_check) {
            message.error('Terms and Conditions are must be checked.');
            return;
        }
        
        console.log(data);
    }
    
    const watchedUserPassword = watch('user_pw');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-3'>
            <div className='w-full'>
                <div className='max-w-xs mx-auto'>
                    <div className='flex gap-4'>
                        <Controller 
                            name='user_first_name' 
                            control={control} 
                            rules={{ 
                                required: true,                                     
                            }} 
                            render={({ field }) => (
                                <Input 
                                    {...field}                                 
                                    placeholder='First Name*' 
                                    className='h-12 placeholder-stone-400' 
                                />
                            )}
                        />
                        <Controller 
                            name='user_last_name' 
                            control={control} 
                            rules={{ 
                                required: true,     
                            }} 
                            render={({ field }) => (
                                <Input 
                                    {...field}                                  
                                    placeholder='Last Name*' 
                                    className='h-12 placeholder-stone-400' 
                                />
                            )}
                        />
                    </div>                    
                    <p className='h-6 text-xs font-semibold text-left text-red-600'>
                        {
                            errors.user_first_name?.type === 'required' && errors.user_last_name?.type === 'required' ? (
                                'First name and last name are required.'
                            ) : errors.user_first_name?.type === 'required' ? (
                                'First name is required.'
                            ) : errors.user_last_name?.type === 'required' && (
                                'Last name is required.'
                            )
                        }
                    </p> 
                </div>                
            </div>            
            <div className='w-full'>
                <div className='grid max-w-xs grid-cols-6 mx-auto'>
                    <Controller 
                        name='user_email' 
                        control={control}
                        rules={{ 
                            required: true,
                            pattern: /^(?=.*[a-zA-Z0-9])([a-zA-Z0-9]{7,})$/,                     
                        }} 
                        render={
                            ({ field }) => (
                                <Input 
                                    {...field} 
                                    placeholder='email*' 
                                    className='h-12 col-span-3 placeholder-stone-400'
                                />
                            )
                        }
                    /> 
                    <span className='flex items-center justify-center text-xl'>
                        @
                    </span>    
                    <Controller 
                        name='email_domain' 
                        control={control}
                        rules={{ 
                            required: true,                               
                        }} 
                        render={
                            ({ field }) => (
                                <Select   
                                    {...field}
                                    className='h-12 col-span-2' 
                                    options={emailSelectOptions}   
                                    placeholder='naver.com'                                    
                                />
                            )
                        }
                    />                                            
                </div>   
                <p className='h-6 text-xs font-semibold text-left text-red-600'>
                    {
                        errors.user_email?.type === 'required' ? (
                            'email is required.'
                        ) : errors.user_email?.type === 'pattern' ? (
                            '7 chars, with letters and numbers'
                        ) : errors.email_domain?.type === 'required' && (
                            'email domain is required.'
                        )
                    }        
                </p>                  
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
                                    placeholder='password*' 
                                    className='h-12 placeholder-stone-400'                                    
                                />
                            )
                        }
                    />  
                    <p className='h-6 text-xs font-semibold text-left text-red-600'>
                        {
                            errors.user_pw?.type === 'required' ? (
                                'password is required.'
                            ) : errors.user_pw?.type === 'pattern' && (
                                'Please enter at least 9 digits or English.'
                            )
                        }
                    </p>            
                </div>                  
            </div>         
            <div className='w-full'>
                <div className='max-w-xs mx-auto'>
                    <Controller 
                        name='user_pw_match' 
                        control={control}
                        rules={{ 
                            required: true,                             
                            validate: (value) => value === watchedUserPassword || 'Password not match.'
                        }} 
                        render={
                            ({ field }) => (
                                <Input.Password 
                                    {...field}
                                    placeholder='repeat passwrod*' 
                                    className='h-12 placeholder-stone-400'                                    
                                />
                            )
                        }
                    />  
                    <p className='h-6 text-xs font-semibold text-left text-red-600'>
                        {
                            errors.user_pw_match?.message
                        }
                    </p>            
                </div>                  
            </div>   
            <div className='w-full'>
                <p className='flex items-center justify-end max-w-xs gap-2 mx-auto text-xs font-thin'>
                    I agree to the Privacy Policy Terms of Use.
                    <Controller 
                        name='terms_check'
                        control={control}                
                        render={
                            ({ field }) => (
                                <Checkbox 
                                    {...field}
                                    checked={field.value}
                                />
                            )
                        }
                    />
                </p>
            </div>
            <div className='flex flex-col w-full gap-4 px-6 mt-4'>
                <Button>
                    Sign Up
                </Button>
                <OutlineButton>
                    <AiOutlineGooglePlus className='text-2xl' />
                    Google
                </OutlineButton>
                <div className='flex justify-end'>
                    <Link to='/login' className='text-sm font-thin border-b border-b-black hover:font-bold'>
                        Go to Login
                    </Link>
                </div>
            </div>             
        </form>
    );
};

export default SignUpForm;
import type { FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Checkbox, Input, Select, message } from 'antd';
import { Button } from '../../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { emailSelectOptions } from '../../constants/SignUpPage';
import { signUp_API } from '../../api/userApis';

const SignUpForm: FC = () => {

    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control, watch } = useForm<UserSignUpFormType>();
    const onSubmit: SubmitHandler<UserSignUpFormType> = async (signUpFormData) => {
        if (!signUpFormData.termsCheck) {
            message.error('Terms and Conditions are must be checked.');
            return;
        }

        const userData: RequestSignUpUserType = {
            name: `${signUpFormData.firstName} ${signUpFormData.lastName}`,
            email: `${signUpFormData.emailID}@${signUpFormData.emailDomain}`,
            password: signUpFormData.password
        }
        
        const { data } = await signUp_API(userData); 

        message.success('User signed up successfully!');
        navigate('/login', { replace: true, state: { signUpedEmail: data.email  } });
    }
    
    const watchedUserPassword = watch('password');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-3'>
            <div className='w-full'>
                <div className='max-w-xs mx-auto'>
                    <div className='flex gap-4'>
                        <Controller 
                            name='firstName' 
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
                            name='lastName' 
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
                            errors.firstName?.type === 'required' && errors.lastName?.type === 'required' ? (
                                'First name and last name are required.'
                            ) : errors.firstName?.type === 'required' ? (
                                'First name is required.'
                            ) : errors.lastName?.type === 'required' && (
                                'Last name is required.'
                            )
                        }
                    </p> 
                </div>                
            </div>            
            <div className='w-full'>
                <div className='grid max-w-xs grid-cols-6 mx-auto'>
                    <Controller 
                        name='emailID' 
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
                        name='emailDomain' 
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
                <p className='h-6 max-w-xs mx-auto text-xs font-semibold text-left text-red-600'>
                    {
                        errors.emailID?.type === 'required' ? (
                            'email is required.'
                        ) : errors.emailID?.type === 'pattern' ? (
                            '7 chars, with letters and numbers'
                        ) : errors.emailDomain?.type === 'required' && (
                            'email domain is required.'
                        )
                    }        
                </p>                  
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
                                    placeholder='password*' 
                                    className='h-12 placeholder-stone-400'                                    
                                />
                            )
                        }
                    />  
                    <p className='h-6 text-xs font-semibold text-left text-red-600'>
                        {
                            errors.password?.type === 'required' ? (
                                'password is required.'
                            ) : errors.password?.type === 'pattern' && (
                                'Please enter at least 9 digits or English.'
                            )
                        }
                    </p>            
                </div>                  
            </div>         
            <div className='w-full'>
                <div className='max-w-xs mx-auto'>
                    <Controller 
                        name='repeatPassword' 
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
                            errors.repeatPassword?.message
                        }
                    </p>            
                </div>                  
            </div>   
            <div className='w-full'>
                <p className='flex items-center justify-end max-w-xs gap-2 mx-auto text-xs font-thin'>
                    I agree to the Privacy Policy Terms of Use.
                    <Controller 
                        name='termsCheck'
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
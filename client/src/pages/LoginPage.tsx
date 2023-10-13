import type { FC } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { LoginForm } from '../features/index';

const LoginPage: FC = () => {

    return (
        <section className='absolute inset-0 flex justify-center pt-20'>
            <div className='w-1/3 pt-4 pb-3 transition bg-white rounded-md shadow-md hover:shadow-xl h-fit'>
                <h3 className='flex flex-col items-center gap-2'>
                    <AiOutlineLogin className='flex items-center justify-center p-4 text-6xl bg-orange-200 rounded-full'/>
                    <span className='text-2xl font-bold'>
                        Login
                    </span>
                </h3>
                <LoginForm />
            </div>           
        </section>
    );
};

export default LoginPage;
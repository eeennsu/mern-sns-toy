import type { FC } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { SignUpForm } from '../features/index';

const SignUpPage: FC = () => {

    return (
        <section className='absolute inset-0 flex justify-center pt-20'>
            <div className='w-full max-w-sm pt-4 pb-3 transition bg-white rounded-md shadow-md hover:shadow-xl h-fit'>
                <h3 className='flex flex-col items-center gap-2'>
                    <AiOutlineUserAdd className='flex items-center justify-center p-4 text-6xl bg-orange-200 rounded-full'/>
                    <span className='text-2xl font-bold'>
                        SignUp
                    </span>
                </h3>
                <SignUpForm />
            </div>           
        </section>
    );
};

export default SignUpPage;
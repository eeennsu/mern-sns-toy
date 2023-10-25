import type { FC } from 'react';
import { Button2, Input } from '../../../components';

const Search: FC = () => {



    return (
        <section className='justify-center h-full p-4 my-6 transition duration-500 bg-white rounded-md shadow-2xl hover:-translate-y-3'>
            <form className='flex flex-col gap-y-3'>
                <div>
                    <Input placeholder='Search Post'/>
                </div>
                <div>
                    <Input placeholder='Search Tags'/>
                </div>
                <Button2 type='submit' className='bg-blue-800'>
                    search
                </Button2>
            </form>
        </section>
    );
};

export default Search;
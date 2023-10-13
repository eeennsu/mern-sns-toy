import type { FC } from 'react';
import { trip } from '../../../assets/images';

const Header: FC = () => {

    return (
        <header className='flex items-center justify-center gap-6 py-2 bg-white shadow-lg rounded-xl'>
            <h1 className='text-6xl text-sky-400'>Memories</h1> 
            <img src={trip} className='object-cover h-14 w-14 -rotate-12' />
        </header>
    );
};

export default Header;
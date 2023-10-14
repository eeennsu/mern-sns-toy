import type { FC } from 'react';
import { useAppDispatch } from '../../../redux/actionTypes';

const LoginPlease: FC = () => {

    return (
        <aside className='max-w-sm p-5 bg-white rounded-lg shadow-xl'>
            <h2 className='text-lg font-thin text-center md:text-xl '>
                Please Login to create your own memories and like other's memories.
            </h2>  
        </aside>        
    )
};

export default LoginPlease;
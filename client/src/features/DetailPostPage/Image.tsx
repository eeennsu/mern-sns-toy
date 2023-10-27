import type { FC } from 'react';

type Props = {
    src: string;
}

const Image: FC<Props> = ({ src }) => {

    return (
        <div className='flex items-center justify-center'>
            <img src={src} className='object-cover shadow-md rounded-2xl' />
        </div>      
    );
};

export default Image;
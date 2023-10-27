import type { FC, PropsWithChildren } from 'react';

const Title: FC<PropsWithChildren> = ({ children }) => {

    return (
        <h2 className='my-4 text-5xl font-semibold md:my-0'>
            {children}
        </h2>    
    );
};

export default Title;
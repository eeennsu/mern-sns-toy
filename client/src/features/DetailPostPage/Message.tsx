import type { FC, PropsWithChildren } from 'react';

const Message: FC<PropsWithChildren> = ({ children }) => {

    return (
        <div className='mt-4'>
            {children}
        </div>
    );
};

export default Message;
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: FC = () => {

    return (        
        <div className='min-h-[100dvh] flex flex-col h-full max-w-6xl py-2 mx-auto md:py-10 '>               
            <Header />
            <main className='relative flex flex-1'>
                <Outlet />                     
            </main>                        
        </div>           
    );
};

export default Layout;
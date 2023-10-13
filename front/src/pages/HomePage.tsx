import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/actionTypes';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../actions/posts';
import { Posts, Form, Header } from '../features/Main';
import { Spin } from '../components';

const HomePage: FC = () => {

    const [curPostId, setCurPostId] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const isLoadingPost = useAppSelector(state => state.isLoadingPost);
    
    useEffect(() => {
        
        console.log(import.meta.env.DEV ? 'dev 모드' : 'prod 모드');

        const getPostsDispatch = getAllPosts();

        getPostsDispatch(dispatch);
    }, [dispatch]);

    console.log();
    
    return (
        <main className='min-h-[100dvh] relative'>
            {
                isLoadingPost && (
                    <div className='absolute inset-0 z-20 flex items-center bg-black/10'>
                        <div className='absolute inset-0 flex items-center w-full max-h-screen min-h-screen'>
                            <Spin />    
                        </div>                                  
                    </div>
                )
            }
            <div className='max-w-6xl py-2 mx-auto md:py-10'>               
                <Header />
                <div className='flex flex-col-reverse items-center pt-6 md:pt-12 md:items-start md:flex-row justify-beteen'>
                    <Posts setCurPostId={setCurPostId} />              
                    <Form curPostId={curPostId} setCurPostId={setCurPostId} />
                </div>                
            </div>            
        </main>
    );
};

export default HomePage;
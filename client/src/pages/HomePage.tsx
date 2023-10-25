import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/actionTypes';
import { useEffect, useState } from 'react';
import { getPosts } from '../actions/posts';
import { Spin } from '../components';
import { LoginPlease, PostForm, Posts, Search, Side } from '../features/index';

const HomePage: FC = () => {

    const dispatch = useAppDispatch();
    const isLoadingPost = useAppSelector(state => state.posts.isLoadingPost);
    const curPage = useAppSelector(state => state.page.curPage);   

    useEffect(() => {        
        console.log(import.meta.env.DEV ? 'dev 모드' : 'prod 모드');

        const getPostsDispatch = getPosts(curPage);

        getPostsDispatch(dispatch);
    }, [dispatch]);
    
    return (
        <section className='relative flex flex-col-reverse items-center pt-6 md:pt-12 md:items-start md:flex-row justify-beteen'>
            {
                isLoadingPost && (
                    <div className='absolute z-20 flex items-center bg-black/10'>
                        <div className='absolute flex items-center w-full max-h-screen min-h-screen inset-px'>
                            <Spin />    
                        </div>                                  
                    </div>
                )
            }
            <Posts />              
            <Side />            
        </section>    
    );
};

export default HomePage;





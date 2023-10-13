import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/actionTypes';
import { useEffect } from 'react';
import { getAllPosts } from '../actions/posts';
import { Spin } from '../components';
import SignInPlease from '../features/HomePage/PostForm/SignInPlease';
import { PostForm, Posts } from '../features';

const HomePage: FC = () => {

    const dispatch = useAppDispatch();
    const isLoadingPost = useAppSelector(state => state.posts.isLoadingPost);
    const isLogin = useAppSelector(state => state.user.isLogin);

    useEffect(() => {        
        console.log(import.meta.env.DEV ? 'dev 모드' : 'prod 모드');

        const getPostsDispatch = getAllPosts();

        getPostsDispatch(dispatch);
    }, [dispatch]);
    
    return (
        <section className='relative flex flex-col-reverse items-center pt-6 md:pt-12 md:items-start md:flex-row justify-beteen'>
            {
                isLoadingPost && (
                    <div className='absolute z-20 flex items-center bg-black/10'>
                        <div className='absolute inset-0 flex items-center w-full max-h-screen min-h-screen'>
                            <Spin />    
                        </div>                                  
                    </div>
                )
            }
            <Posts />              
            {
                isLogin ? (
                    <PostForm />                            
                ) : (
                    <SignInPlease />
                )
            }                 
        </section>    
    );
};

export default HomePage;





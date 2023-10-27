import type { FC } from 'react';
import { useAppSelector } from '../../../redux/actionTypes';
import { Post, Spin } from '../../../components';
import { shallowEqual } from 'react-redux';

const Posts: FC = () => {
    
    const { posts, searchedPosts, isLoadingPost, isPageLoading, isPageError } = useAppSelector(state => ({
        posts: state.posts.posts,
        searchedPosts: state.posts.searchedPosts,
        isLoadingPost: state.posts.isLoadingPost,
        isPageLoading: state.page.isPageLoading,
        isPageError: state.page.isPageError
    }), shallowEqual);   
   
    return (
        <section className={`flex flex-wrap justify-center flex-1 w-full gap-6 mt-10 md:mt-0 md:justify-start ${(isLoadingPost || isPageLoading) && 'h-full'}`}>            
            {
                (isLoadingPost || isPageLoading) ? (
                    <Spin />    
                ) : isPageError ? (
                    'error'
                ) : (
                    posts?.map((post) => (
                        <Post key={post._id} post={post} />
                    ))
                )
            }            
            {
                (searchedPosts.length >= 1) && searchedPosts?.map(post => (
                    <Post key={post._id} post={post} />
                ))
            }
        </section>
    );
};

export default Posts;

import type { FC, Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '../../../redux/actionTypes';
import { Post, Spin } from '../../../components';
import { shallowEqual } from 'react-redux';

const Posts: FC = () => {
    
    const { posts, searchedPosts, isLoadingPost, isPageLoading } = useAppSelector(state => ({
        posts: state.posts.posts,
        searchedPosts: state.posts.searchedPosts,
        isLoadingPost: state.posts.isLoadingPost,
        isPageLoading: state.page.isPageLoading,
    }), shallowEqual);   
   
    return (
        <section className='flex flex-wrap justify-center flex-1 w-full h-full gap-6 mt-10 md:mt-0 md:justify-start'>            
            {
                (isLoadingPost || isPageLoading) ? (
                    <Spin />    
                ) : (
                    posts?.map((post) => (
                        <Post key={post._id} post={post} />
                    ))
                )
            }  
            {
                (searchedPosts.length >= 0) && searchedPosts?.map(post => (
                    <Post key={post._id} post={post} />
                ))
            }
        </section>
    );
};

export default Posts;

import type { FC, Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '../../../redux/actionTypes';
import { Post, Spin } from '../../../components';

type Props = {
    setCurPostId: Dispatch<SetStateAction<string | null>>;
}

const Posts: FC<Props> = ({ setCurPostId }) => {
    
    const posts = useAppSelector(state => state.posts);
    
    return (
        <section className='flex flex-wrap justify-center w-full gap-6 mt-10 md:mt-0 md:justify-start'>            
            {
                posts?.length ? posts.map(post => (
                    <Post key={post._id} post={post} setCurPostId={setCurPostId}/>
                )) : (
                    <Spin />          
                )
            }   
        </section>
    );
};

export default Posts;
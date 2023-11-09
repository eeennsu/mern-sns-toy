import type { FC } from 'react';
import { useAppSelector } from '../../redux/actionTypes';
import { Divider, Spin } from '../../components';
import { RelatedPost } from '..';
import { useNavigate } from 'react-router-dom';

type Props = {
    id: string;
}

const RelatedPosts: FC<Props> = ({ id }) => {

    const navigate = useNavigate();
    
    const { searchedPosts, isLoadingPost } = useAppSelector(state => ({
        searchedPosts: state.posts.searchedPosts,
        isLoadingPost: state.posts.isLoadingPost
    }));

    const handleRelatedPostGo = () => {
        navigate(`/detail-post/${id}`);
    }

    return (
        <>
            <h2 className=''>
                You might also like:
            </h2>
            <Divider />
            <ul className='flex flex-col flex-wrap justify-center gap-6 mt-10 md:flex-row'>
                {
                    isLoadingPost ? (
                        <Spin />
                    ) : (searchedPosts?.length === 1) ? (
                        'Not related posts.'
                    ) : (
                        searchedPosts?.filter(post => post._id !== id).map(post => (
                            <RelatedPost key={post._id} post={post} onClick={handleRelatedPostGo} />
                        )) 
                    )
                }
            </ul>
        </>
    );
};

export default RelatedPosts;
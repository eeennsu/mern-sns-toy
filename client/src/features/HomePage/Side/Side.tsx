import type { FC } from 'react';
import { LoginPlease, PostForm, Search } from '../..';
import { useAppSelector } from '../../../redux/actionTypes';
import PostPagenation from './PostPagenation';

const Side: FC = () => {

    const isLogin = useAppSelector(state => state.user.isLogin);
    const searchedPosts = useAppSelector(state => state.posts.searchedPosts);

    return (
        <aside className=' w-80'>     
            <Search />       
            {
                isLogin ? (
                    <PostForm />                            
                ) : (
                    <LoginPlease />
                )
            }              
            {!searchedPosts.length && <PostPagenation />}       
        </aside>   
    );
};

export default Side;
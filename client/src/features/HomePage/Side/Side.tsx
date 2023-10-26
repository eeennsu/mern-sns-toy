import type { FC } from 'react';
import { LoginPlease, PostForm, Search } from '../..';
import { useAppSelector } from '../../../redux/actionTypes';
import Pagination from '../../../components/commons/Pagination/Pagination';

const Side: FC = () => {

    const isLogin = useAppSelector(state => state.user.isLogin);
    const searchedPosts = useAppSelector(state => state.posts.searchedPosts);

    return (
        <aside>     
            <Search />       
            {
                isLogin ? (
                    <PostForm />                            
                ) : (
                    <LoginPlease />
                )
            }              
            {!searchedPosts.length && <Pagination />}       
        </aside>   
    );
};

export default Side;
import type { FC } from 'react';
import { LoginPlease, PostForm, Search } from '../..';
import { useAppSelector } from '../../../redux/actionTypes';
import Pagination from '../../../components/commons/Pagination';

const Side: FC = () => {

    const isLogin = useAppSelector(state => state.user.isLogin);

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
            <Pagination />         
        </aside>   
    );
};

export default Side;
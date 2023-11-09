import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/actionTypes';
import { useEffect } from 'react';
import { getPosts } from '../actions/posts';
import { Posts, Side } from '../features/index';
import { createBrowserHistory } from 'history';

const HomePage: FC = () => {

    const dispatch = useAppDispatch();
    const history = createBrowserHistory();
    const curPage = useAppSelector(state => state.page.curPage);   

    useEffect(() => {        
        console.log(import.meta.env.DEV ? 'dev 모드' : 'prod 모드');

        const getPostsDispatch = getPosts(curPage);

        getPostsDispatch(dispatch);
    }, [dispatch]);
    
    useEffect(() => {
        history.listen(() => {
            if (history.action === 'POP') {
                dispatch({ type: 'RESET_ALL_POSTS_SUB_INFOS', payload: null });
            }
        })
    }, [history]);

    return (
        <section className='relative flex flex-col-reverse items-center flex-1 pt-6 md:pt-12 md:items-start md:flex-row justify-beteen'>
            {/* {
                isLoadingPost && (
                    <div className='absolute z-20 flex items-center bg-black/10'>
                        <div className='absolute flex items-center w-full max-h-screen min-h-screen inset-px'>
                            <Spin />    
                        </div>                                  
                    </div>
                )
            } */}
            <Posts />              
            <Side />            
        </section>    
    );
};

export default HomePage;





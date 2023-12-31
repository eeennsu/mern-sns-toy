import type { FC } from 'react';
import { trip } from '../../assets/images';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../redux/actionTypes';
import { Button, OutlineButton } from '../../components/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, message } from 'antd';
import { shallowEqual } from 'react-redux';
import { userLogout } from '../../actions/user';
import { useEffect } from 'react';
import decode from 'jwt-decode';

const Header: FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const { isLogin, email, imgUrl, searchedPosts } = useAppSelector(state => ({
        isLogin: state.user.isLogin,
        role: state.user.role,
        email: state.user.email,
        imgUrl: state.user.imgUrl,
        searchedPosts: state.posts.searchedPosts
    }), shallowEqual); 

    const handleLoginPage = () => {
        dispatch({ type: 'RESET_ALL_POSTS_SUB_INFOS', payload: null });
        navigate('/login');
    }

    const handleHomePage = () => {
        dispatch({ type: 'RESET_ALL_POSTS_SUB_INFOS', payload: null });
        const path = location.pathname;
    
        path === '/' ? navigate(0) : navigate('/');
    }

    const handleLogout = async (auto: boolean = false) => {
        const logoutDispatch = userLogout();
        await logoutDispatch(dispatch);

        navigate('/', { replace: true });
        !auto && message.success('logout success');
    }

    useEffect(() => {
        const profile = localStorage.getItem('profile');

        if (profile) {
            const token: string = JSON.parse(profile)?.token;
            
            // 일단 현재 일반 로그인일 경우
            if (token) {
                const decodedToken = decode<DecodedUserToken>(token);
     
                console.log('decodedToken', decodedToken);
                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    handleLogout(true);
                }
            }      
            
            // 구글 로그인일 경우, 잠시 생략
            // else {

            // }
        }

    //eslint-disable-next-line
    }, []);

    return (
        <header className='sticky z-20 flex items-center justify-between px-8 py-1 bg-white shadow-lg top-10 md:py-2 md:px-12 rounded-xl'>
            <section onClick={handleHomePage} className='flex items-center justify-center gap-6 py-2 cursor-pointer'>
                <h1 className='text-4xl transition duration-300 md:text-6xl text-sky-400 hover:text-sky-600'>
                    Memories
                </h1> 
                <img src={trip} className='object-cover transition shadow-md h-14 w-14 -rotate-12 hover:rotate-12' />
            </section>
            <section className='flex justify-end w-1/4'>
                {
                    isLogin ? (
                        <div className='flex items-center justify-between gap-3'>
                            <div className='items-center hidden max-w-4xl gap-3 md:flex'>
                                <Avatar size='large' className='flex items-center justify-center flex-shrink-0 text-xl' src={imgUrl || ''} >
                                    {email?.charAt(0) || <AiOutlineUser />}
                                </Avatar>
                                <h2 className='hidden overflow-hidden font-bold text-ellipsis md:block whitespace-nowrap'>
                                    {email}
                                </h2>
                            </div>
                            <OutlineButton onClick={() => handleLogout()}> 
                                <AiOutlineLogout />
                                logout
                            </OutlineButton>
                        </div>
                    ) : (
                        <Button onClick={handleLoginPage}>
                            <AiOutlineUser />
                            login
                        </Button>
                    )
                }
            </section>
        </header>
    );
};

export default Header;
import type { FC } from 'react';
import { trip } from '../../assets/images';
import { AiOutlineUser } from 'react-icons/ai';
import { useAppSelector } from '../../redux/actionTypes';
import Button from '../../components/commons/Button';
import OutlineButton from '../../components/commons/OutlineButton';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {

    const isLogin = useAppSelector(state => state.user.isLogin);
    const navigate = useNavigate();

    const handleLoginPage = () => {
        navigate('/login');
    }

    const handleHomePage = () => {
        navigate('/');
    }

    return (
        <header className='flex items-center justify-between px-8 py-1 bg-white shadow-lg md:py-2 md:px-12 rounded-xl'>
            <div onClick={handleHomePage} className='flex items-center justify-center gap-6 py-2 cursor-pointer'>
                <h1 className='text-4xl transition duration-300 md:text-6xl text-sky-400 hover:text-sky-600'>
                    Memories
                </h1> 
                <img src={trip} className='object-cover transition shadow-md h-14 w-14 -rotate-12 hover:rotate-12' />
            </div>
            <div>
                {
                    isLogin ? (
                        <OutlineButton>
                            <AiOutlineUser />
                            logout
                        </OutlineButton>
                    ) : (
                        <Button onClick={handleLoginPage}>
                            <AiOutlineUser />
                            login
                        </Button>
                    )
                }
            </div>
        </header>
    );
};

export default Header;
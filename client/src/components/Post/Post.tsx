import type { FC } from 'react';
import { Tag, message } from 'antd';
import { IoMdMore } from 'react-icons/io';
import { BiSolidLike, BiTrash } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/actionTypes';
import { deletePost, plusLiketPost } from '../../actions/posts';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGoogleUserInfo } from '../../actions/user';
import formatRelativeTime from '../../utils/formatRelativeTime';

type Props = {
    post: Post;
}

const colors = ['blue', 'cyan', 'gold', 'magenta', 'geekblue', 'green'];

const Post: FC<Props> = ({ post }) => {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLogin, email } = useAppSelector(state => ({
        isLogin: state.user.isLogin,
        email: state.user.email,
    }), shallowEqual);

    const tags = post.tags as string[];
    
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>();
    const [likes, setLikes] = useState<string[]>(post.likes);
    
    const isCurrentUserPost = email === post.creator;
    const hasLikedPost = likes.find((like) => like === email);

    const relativeTimeFormat: string = useMemo(
        () => formatRelativeTime(new Date(post.createdAt)), 
        [post.createdAt]
    );

    const handleLike = async () => {
        if (!isLoginCheck()) return;

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== email));
        } else {
            setLikes(prev => [...prev, email!]);
        }      
        
        const profile = JSON.parse(localStorage.getItem('profile') as string);

        if (profile) {     
            const googleEmail = await getGoogleUserInfo(profile.access_token);

            const updatePostDispatch = plusLiketPost(post._id, googleEmail);
         
            updatePostDispatch(dispatch);
        } else {
            const updatePostDispatch = plusLiketPost(post._id);

            updatePostDispatch(dispatch);
        }       
    }

    const handleEdit = () => {
        if (!isLoginCheck()) return;

        dispatch({ type: 'SELECT_POST_ID', payload: post._id })
    }

    const handleDelete = async () => {
        if (!isLoginCheck()) return;
        
        setIsDeleteLoading(true);
        const deletePostDispatch = deletePost(post._id); 

        await deletePostDispatch(dispatch);
        setIsDeleteLoading(false);
    }

    const isLoginCheck = () => {
        if (!isLogin) {
            message.warning('login please..');
            return false; 
        }

        return true;
    }
    
    const handleDetailPostPage = () => {
        navigate(`/detail-post/${post._id}`);
    }
    
    return (
        <div className='transition bg-white cursor-pointer card w-80 shadow-post-card group'>
            <figure className='relative inset-0'>
                <div className='absolute left-0 z-20 flex flex-col justify-center w-full px-5 top-4'>
                    <div className='flex justify-between'>
                        <p className='font-bold text-white top-5 left-5'>
                            {post.creator}
                        </p>
                        <button onClick={handleEdit} disabled={!(isLogin && isCurrentUserPost)} className={`${(isLogin && isCurrentUserPost) ? 'flex' : 'hidden'} items-center justify-center transition-colors rounded-full w-7 h-7 hover:bg-white/10`}>
                            <IoMdMore className='text-white'/>
                        </button>
                    </div>
                    <div className='text-xs text-white'>
                        {relativeTimeFormat}
                    </div>
                </div>              
                <div className='absolute z-10 hero-overlay'/>
                <img src={post.selectedFile || 'https://picsum.photos/320/180'} className='object-cover w-[320px] h-[156px] transition duration-300 group-hover:scale-110' alt="image" />
            </figure>
            <div className="flex flex-col px-3 py-1">
                <div onClick={handleDetailPostPage} >
                    <p className='my-2 text-sm text-slate-600'>
                        {
                            tags.map((tag, i) => (
                                <Tag key={`${i}-${tag}`} color={colors[Math.floor(Math.random() * colors.length)]}>
                                    {tag}
                                </Tag>
                            ))
                        }
                    </p>
                    <h2 className="text-2xl font-bold capitalize text-slate-800 space">
                        {post.title}                   
                    </h2>
                    <p className='mt-5 text-sm text-gray-500 line-clamp-3 text-slate min-h-[88px]'>
                        {post.message} 
                    </p>                  
                </div>     
                <div className='flex justify-between mt-4 mb-1.5'>
                    <div className='hover:font-extrabold'>
                        <button onClick={handleLike} className={`z-10 flex items-center justify-center gap-1 ${(isLogin && hasLikedPost) ? 'text-blue-500' : 'text-gray-400'} px-2.5 py-1.5 ${(isLogin && hasLikedPost) && 'transition-colors duration-200 active:bg-gray-400/50 hover:bg-gray-400/25 hover:text-blue-800'} rounded-3xl `}>
                            <BiSolidLike />
                            <span className='w-full'>
                                {
                                    `Like ${likes.length}`
                                }
                            </span> 
                        </button>                                        
                    </div>
                    <div className={`${(isLogin && isCurrentUserPost) ? 'block' : 'hidden'}`}>
                        <button onClick={handleDelete} disabled={!isCurrentUserPost} className='flex w-[98px] items-center justify-center gap-1 px-2.5 py-1.5 text-red-400 transition-colors duration-200 active:bg-gray-400/50 hover:bg-gray-400/25 rounded-3xl'>
                            <BiTrash />
                            <span className='w-full'>
                                {
                                    isDeleteLoading ? 'loading..' : 'DELETE'
                                }
                            </span>                            
                        </button>
                    </div>
                </div>         
            </div>
        </div>
    );
};

export default Post;


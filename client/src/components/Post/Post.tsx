import { Tag, message } from 'antd';
import { IoMdMore } from 'react-icons/io';
import type { FC } from 'react';
import { BiSolidLike, BiTrash } from 'react-icons/bi';
import formatRelativeTime from '../../utils/formatRelativeTime';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/actionTypes';
import { deletePost, plusLiketPost } from '../../actions/posts';
import { shallowEqual } from 'react-redux';
import { memo } from 'react';

type Props = {
    post: Post;
}

const colors = ['blue', 'cyan', 'gold', 'magenta', 'geekblue', 'green'];

const Post: FC<Props> = ({ post }) => {
    
    const dispatch = useAppDispatch();
    const { isLogin, email, googleResponse } = useAppSelector(state => ({
        isLogin: state.user.isLogin,
        email: state.user.email,
        googleResponse: state.user.googleResponse
    }), shallowEqual);

    const tags = post.tags as string[];
    
    const [isLikeLoading, setIsLikeLoading] = useState<boolean>();
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>();
    const [isLikedUser, setIsLieUser] = useState<boolean>(Boolean(post.likes.find((likedUserEmail) => likedUserEmail === (email || googleResponse))));
    const isCurrentUserPost = email === post.creator;

    const relativeTimeFormat: string = useMemo(
        () => formatRelativeTime(new Date(post.createdAt)), 
        [post.createdAt]
    );

    const handleLike = async () => {
        if (!isLoginCheck()) return;

        setIsLikeLoading(true);
        const updatePostDispatch = plusLiketPost(post._id);

        await updatePostDispatch(dispatch);
        setIsLieUser(prev => !prev);
        setIsLikeLoading(false);
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
                <div className='flex justify-between mt-4 mb-1.5'>
                    <div>
                        <button onClick={handleLike} className={`flex items-center justify-center gap-1 ${(isLogin && isLikedUser) ? 'text-blue-500' : 'text-gray-400'} px-2.5 py-1.5 ${(isLogin && isLikedUser) && 'transition-colors duration-200 active:bg-gray-400/50 hover:bg-gray-400/25 hover:text-blue-800'} rounded-3xl `}>
                            <BiSolidLike />
                            <span className='w-full'>
                                {
                                    isLikeLoading ? 'loading...' : `Like ${post.likes.length}`
                                }
                            </span> 
                        </button>                                        
                    </div>
                    <div className={`${(isLogin && isCurrentUserPost) ? 'block' : 'hidden'}`}>
                        <button onClick={handleDelete} disabled={!isCurrentUserPost} className={`flex w-[98px] items-center justify-center gap-1 px-2.5 py-1.5 text-red-400 transition-colors duration-200 active:bg-gray-400/50 hover:bg-gray-400/25 rounded-3xl`}>
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


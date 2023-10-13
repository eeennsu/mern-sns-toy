import { Spin, Tag } from 'antd';
import { IoMdMore } from 'react-icons/io';
import type { FC, Dispatch, SetStateAction } from 'react';
import { BiSolidLike, BiTrash } from 'react-icons/bi';
import formatRelativeTime from '../../utils/formatRelativeTime';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '../../redux/actionTypes';
import { deletePost, plusLiketPost, updatePost } from '../../actions/posts';

type Props = {
    post: Post;
    setCurPostId: Dispatch<SetStateAction<string | null>>;
}

const colors = ['blue', 'cyan', 'gold', 'magenta', 'geekblue', 'green'];

const Post: FC<Props> = ({ post, setCurPostId }) => {
    
    const dispatch = useAppDispatch();
    const tags = post.tags as string[];
    const [isLikeLoading, setIsLikeLoading] = useState<boolean>();
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>();

    const relativeTimeFormat: string = useMemo(
        () => formatRelativeTime(new Date(post.createdAt)), 
        [post.createdAt]
    );

    const handleLike = async () => {
        setIsLikeLoading(true);
        const updatePostDispatch = plusLiketPost(post._id);

        await updatePostDispatch(dispatch);
        setIsLikeLoading(false);
    }

    const handleEdit = () => {
        setCurPostId(post._id);
    }

    const handleDelete = async () => {
        setIsDeleteLoading(true);
        const deletePostDispatch = deletePost(post._id); 

        await deletePostDispatch(dispatch);
        setIsDeleteLoading(false);
    }
    
    return (
        <div className='transition bg-white cursor-pointer card w-80 shadow-post-card group'>
            <figure className='relative inset-0'>
                <div className='absolute left-0 z-20 flex flex-col justify-center w-full px-5 top-4'>
                    <div className='flex justify-between'>
                        <p className='font-bold text-white top-5 left-5'>
                            {post.title}
                        </p>
                        <div onClick={handleEdit} className='flex items-center justify-center transition-colors rounded-full w-7 h-7 hover:bg-white/10'>
                            <IoMdMore className='text-white'/>
                        </div>
                    </div>
                    <div className='text-xs text-white'>
                        {relativeTimeFormat}
                    </div>
                </div>              
                <div className='absolute z-10 hero-overlay'/>
                <img src='https://picsum.photos/320/180' className='object-cover transition duration-300 group-hover:scale-110' alt="image" />
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
                <p className='mt-5 text-sm text-gray-500 line-clamp-3 text-slate min-h-16'>
                    {post.message} 
                </p>
                <div className="flex justify-between mt-4 mb-1.5 text-blue-500">
                    <div>
                        <button onClick={handleLike} className='flex items-center justify-center gap-1 px-2.5 py-1.5 transition-colors duration-200 active:bg-gray-400/50 hover:bg-gray-400/25 rounded-3xl hover:text-blue-800'>
                            <BiSolidLike />
                            <span className=''>
                                {isLikeLoading ? 'loading...' : `Like ${post.likeCount}`}
                            </span> 
                        </button>                                        
                    </div>
                    <div>
                        <button onClick={handleDelete} className='flex w-[98px] items-center justify-center gap-1 px-2.5 py-1.5 text-red-400 transition-colors duration-200 active:bg-gray-400/50 hover:bg-gray-400/25 rounded-3xl'>
                            <BiTrash />
                            <span className='w-full'>
                                {isDeleteLoading ? 'loading..' : 'DELETE'}
                            </span>                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;


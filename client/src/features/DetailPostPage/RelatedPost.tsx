import type { FC } from 'react';

type Props = {
    post: Post;
    onClick: () => void;
}

const RelatedPost: FC<Props> = ({ post, onClick }) => {

    return (
        <div className='flex flex-col p-4 bg-orange-200 rounded-md shadow-md cursor-pointer gap-y-4 hover:shadow-xl' onClick={onClick}>
            <h3 className='text-2xl font-bold'>
                {post.title}
            </h3>
            <h4 className='text-xs italic'>
                {post.creator}
            </h4>
            <p className='pt-2 border-t-2'>
                {post.message}
            </p>
            <p className='text-xs italic'>
                Likes: <span className='font-bold text-blue-500'>{post.likes.length}</span>
            </p>
            <img src={post.selectedFile} className='w-[200px]'/>
        </div>
    );
};

export default RelatedPost;
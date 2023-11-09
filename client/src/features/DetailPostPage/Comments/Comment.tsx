import type { FC } from 'react';

type Props = {
    comment: string;
}

const Comment: FC<Props> = ({ comment }) => {

    const _comment = comment.split('/');

    return (
        <p className='flex w-full text-xs'>
            <span className='font-bold whitespace-nowrap'>
                {_comment[0]}
            </span>
            <span className='ml-3'>
                {_comment[1]}
            </span>          
        </p>
    );
};

export default Comment;
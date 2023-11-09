import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import WriteInput from './WriteInput';
import Comment from './Comment';

type Props = {
    comments: string[];
}

const Comments: FC<Props> = ({ comments }) => {

    const { id } = useParams();
    const commentsBottomRef = useRef<HTMLDivElement | null>(null);

    const handleFocus = useCallback(() => {
        console.log('호추');
        commentsBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [commentsBottomRef.current])

    return (
        <div className='flex items-center justify-center gap-8'>
            <ul className='flex flex-col w-2/5 gap-2.5 overflow-y-auto max-h-48'>
                {
                    comments?.map((comment, i) => (
                        <Comment key={comment} comment={comment} />                      
                    ))
                }
                <div ref={commentsBottomRef} />
            </ul>
            <div className='w-3/5 h-full'>
                <WriteInput postId={id} handleFocus={handleFocus} />
            </div>
        </div>
    );
};

export default Comments;
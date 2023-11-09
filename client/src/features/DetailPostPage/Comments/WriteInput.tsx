import type { FC, ChangeEvent } from 'react';
import { Button, Input, message } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/actionTypes';
import { submitComment } from '../../../actions/posts';

const { TextArea } = Input;

type Props = {
    postId?: string;
    handleFocus: () => void;
}

const WriteInput: FC<Props> = ({ postId, handleFocus }) => {

    const dispatch = useAppDispatch();
    const userEmail = useAppSelector(state => state.user.email);

    const [inputComment, setInputComment] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleSubmitChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputComment(e.target.value);
    }

    const handleSubmitComment = async () => {
        setIsLoading(true);

        if (inputComment.length <= 0) {
            message.warning('input please');
            
            return;
        }

        if (!postId) {
            message.error('오류가 발생했습니다');
            
            return;
        }

        const userId = userEmail!.split('@');

        const commentDispatch = submitComment(postId, `${userId[0]}/${inputComment}`);

        await commentDispatch(dispatch);
        
        setInputComment('');
        location.reload();
        setIsLoading(false);
        handleFocus();
    }

    return (
        <div className='flex flex-col h-full gap-3'>
            <h4 className='text-lg font-bold'>Write a comment</h4>
            <TextArea 
                value={inputComment}
                onChange={handleSubmitChange}
                placeholder={`${Boolean(userEmail) ? 'Please comment...' : 'Please Login...'}`}
                className='flex-1'
                size='small'
                style={{
                    resize: 'none',
                    padding: 8
                }}
                disabled={!Boolean(userEmail)}
            />
            <Button type='primary' onClick={handleSubmitComment} disabled={!Boolean(userEmail)} loading={isLoading} >
                COMMENT
            </Button>
        </div>
    );
};

export default WriteInput;
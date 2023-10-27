import type { FC, FormEvent, ChangeEvent, CSSProperties  } from 'react';
import { Button2, Input } from '../../../components';
import { useState, useCallback, useEffect } from 'react';
import message from 'antd/es/message';
import { searchPosts } from '../../../actions/posts';
import { useAppDispatch, useAppSelector } from '../../../redux/actionTypes';
import { shallowEqual } from 'react-redux';
import ChipInput from 'material-ui-chip-input';

const Search: FC = () => {

    const dispatch = useAppDispatch();
    const { isLoadingPosts, searchedPosts } = useAppSelector(state => ({
        isLoadingPosts: state.posts.isLoadingPost,
        searchedPosts: state.posts.searchedPosts
    }), shallowEqual);

    const [inputTitle, setInputTitle] = useState<string>('');
    const [inputTags, setInputTags] = useState<string[]>([]);

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!inputTitle && !inputTags) {
            message.warning('Please enter title or tags.');
            return;
        }

        const searchDispatch = searchPosts(inputTitle.trim(), inputTags.join(','));
        
        await searchDispatch(dispatch);
    }

    const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value)
    }, [inputTitle]);

    const handleAddTags = (newChip: string) => {
        setInputTags(prev => [...prev, newChip]);
    }

    const handleDeleteTags = (deleteChip: string) => {
        setInputTags(prev => prev.filter((chip) => chip !== deleteChip));
    }

    useEffect(() => {
        console.log(searchedPosts);
    }, [searchedPosts]);

    return (
        <section className='justify-center h-full p-4 my-6 transition duration-500 bg-white rounded-md shadow-2xl hover:-translate-y-3'>
            <form onSubmit={handleSearch} className='flex flex-col gap-y-3'>
                <div>
                    <Input value={inputTitle} onChange={handleChangeTitle} placeholder='Search Post'/>
                </div>
                <div>
                    {/* <Input value={inputTags} onChange={handleChangeTags} placeholder='Search Tags'/> */}
                    <ChipInput className='w-full' style={{ paddingInline: '8px' }} value={inputTags} onAdd={handleAddTags} onDelete={handleDeleteTags} placeholder='Search Tags' />
                </div>
                <Button2 type='submit' className='bg-blue-800'>
                    search
                </Button2>
            </form>
        </section>
    );
};

export default Search;
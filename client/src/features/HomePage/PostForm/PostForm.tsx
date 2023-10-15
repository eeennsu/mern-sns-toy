import type { FC, FormEvent, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useAppDispatch, useAppSelector } from '../../../redux/actionTypes';
import { createPost, updatePost } from '../../../actions/posts';
import { message as antdMessage } from 'antd';
import { shallowEqual } from 'react-redux';

const initForm: PostFormData = {
    title: '',
    message: '',
    selectedFile: '',
    tags: [], 
}

const Form: FC = () => {

    const dispatch = useAppDispatch();
    const { selectedPost, email } = useAppSelector(state => ({
        selectedPost: state.posts.selectedPost,
        email: state.user.email
    }), shallowEqual);
    const [formData, setFormData] = useState<PostFormData>(initForm);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: 'IS_LOADING_API_POST', payload: true });

        const { message, selectedFile, tags, title } = formData;
        
        if (!message || !selectedFile || !tags || !title) {
            antdMessage.error('All information enter please...');
            dispatch({ type: 'IS_LOADING_API_POST', payload: false });
            return;
        }

        if (!tags.includes('#')) {
            antdMessage.error('Tags need #...');
            dispatch({ type: 'IS_LOADING_API_POST', payload: false });
            return 
        }

        if (typeof tags === 'string') {
            const seperatedTags = tags.split('#').splice(1, tags.length);
            formData.tags = seperatedTags;
        }

        // 만약 가지고 있다면 포스트를 수정한다는 뜻
        if (selectedPost) {
            const updatePostDispatch = updatePost(selectedPost._id, formData);
            
            await updatePostDispatch(dispatch); 
            antdMessage.success('updated!!');
        } else {
            const createPostDispatch = createPost(formData, email!);
        
            await createPostDispatch(dispatch);
            antdMessage.success('created!');
        }    

        // 폼 리셋
        dispatch({ type: 'IS_LOADING_API_POST', payload: false });
        handleFormReset(); 
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => {
            const { name, value } = e.target;

            return {
                ...prev,
                [name]: value
            };
        });
    }

    const handleFormReset = () => {
        setFormData(initForm);
        dispatch({ type: 'SELECT_POST_ID', payload: null });
    }

    useEffect(() => {
        if (selectedPost) {        
            // 하나의 id로 서버 api를 통해 가져오는 방법이지만, 기존 state 배열에서 index를 찾아 가져오는 방법이 더 빠르긴하다.
            // (async () => {
            //     const { data } = await getOnePost_API(curPostId);
            //     const tags = data.tags as string[]; 

            //     setIsPostLoading(false);
            //     setFormData({
            //         creator: data.creator,
            //         title: data.title,
            //         message: data.message,
            //         tags: tags.length === 1 ? `#${tags[0]}` : tags.map(tag => `#${tag}`).join(''),
            //         selectedFile: data.selectedFile       
            //     });
                
            // })();

            const tags = selectedPost?.tags as string[]; 
       
            setFormData({
                title: selectedPost!.title,
                message: selectedPost!.message,
                tags: tags.length === 1 ? `#${selectedPost!.tags}` : tags.map((tag) => `#${tag}`).join(''),
                selectedFile: selectedPost!.selectedFile
            });
        }
    }, [selectedPost]);

    return (
        <aside className='relative flex flex-col justify-center h-full p-4 mt-8 transition duration-500 bg-white rounded-sm shadow-2xl md:mt-0 ites-center hover:-translate-y-3'>
            <h2 className='py-2 text-xl font-bold text-black'>
                {selectedPost ? 'Updating your memory' : 'Creating your Memory'}
            </h2>
            <form className='flex flex-col gap-4 mt-2' autoComplete='off' noValidate onSubmit={handleSubmit}>
                <div>
                    <input className='w-full px-3 py-2 text-base text-black border rounded-sm outline-none bg-inherit focus:border-black' name='title' placeholder='Title' value={formData.title} onChange={handleInputChange} />
                </div>                  
                        
                <div>
                    <textarea className='w-full px-3 py-2 text-base text-black border rounded-sm outline-none resize-none h-28 bg-inherit focus:border-black' name='message' placeholder='Message' value={formData.message} onChange={handleInputChange} />
                </div>

                <div>
                    <input className='w-full px-3 py-2 text-base text-black border rounded-sm outline-none bg-inherit focus:border-black' name='tags' placeholder='Tags (# separated)' value={formData.tags} onChange={handleInputChange} />
                </div>    
                <div>
                    <FileBase type='file' multiple={false} onDone={({ base64 }: { base64: string }) => setFormData(prev => ({ ...prev, selectedFile: base64 }))} />
                    {/* files <input name='selectedFile' type='file' onChange={handleFileChange} multiple={false} accept='accept="image/jpg, image/png, image/jpeg"' /> */}
                </div>
                <div>
                    <button type='submit' className={`w-full px-3 py-2 text-sm text-white uppercase ${selectedPost ? 'bg-green-600' : 'bg-blue-800'} rounded-sm shadow-lg let`}>
                        {selectedPost ? 'update' : 'create'}
                    </button>
                </div>   
                <div>
                    <button type='reset'  onClick={handleFormReset} className='w-full px-3 py-2 text-sm text-white uppercase bg-red-600 rounded-sm shadow-lg let'>
                        clear
                    </button>                
                </div>                                                                
            </form>
        </aside>
    );
};

export default Form;
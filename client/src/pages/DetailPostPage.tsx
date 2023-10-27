import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOnePost_API } from '../api/postsApis';
import { Divider, Spin } from '../components';
import { Message, Tag, Title, Image, RelatedPosts } from '../features';
import { searchPosts } from '../actions/posts';
import { useAppDispatch } from '../redux/actionTypes';

const DetailPostPage: FC = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        id && getOnePost_API(id)
            .then(data => setPost(data.data))
            .catch(err => console.log(err));
    }, [id]);    

    useEffect(() => {
        post && (async () => {
            const searchDispatch = searchPosts(post.title, (post.tags as string[]).join(','));
    
            await searchDispatch(dispatch);              
        })();
    }, [post, dispatch]);

    return (
        <div className={`${!post && 'flex'} mt-12 md:mt-6 bg-[#f7f8fc] rounded-md flex-1 p-7 `}>
            {
                !post ? (
                    <Spin />
                ) : (      
                    <>
                        <section className='flex flex-col-reverse gap-4 md:flex-row'>        
                            <div className='flex flex-col'>
                                <Title>
                                    {post.title}
                                </Title>                           
                                <ul className='flex mt-4 gap-x-3'>
                                    {
                                        (post.tags as string[]).map((tag, i) => (
                                            <Tag key={i} tag={tag}  />
                                        ))
                                    }
                                </ul>
                                <Message>
                                    {post.message} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ex maiores nemo tempore commodi labore velit iure provident consequatur et deleniti earum odit, voluptates aperiam libero illo laudantium, itaque veniam.
                                </Message>
                                <Divider />
                                <p className='mt-4'>
                                    <span className='mr-3 font-bold'>Realtime Chat</span>
                                    <span>coming soon!</span>
                                </p>
                                <Divider />
                                <p className='mt-4'>
                                    <span className='mr-3 font-bold'>Comments</span>
                                    <span>coming soon!</span>
                                </p>
                            </div>               
                            <Image src={post.selectedFile}/>             
                        </section>     
                        <section className='mt-10'>
                            <RelatedPosts id={post._id}/>
                        </section>  
                    </>                                
                )
            }
        </div>
    );
};

export default DetailPostPage;
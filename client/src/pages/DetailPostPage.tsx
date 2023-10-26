import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOnePost_API } from '../api/postsApis';
import { Spin } from '../components';
import { Divider } from 'antd';

const DetailPostPage: FC = () => {

    const { id } = useParams();

    const [post, setPost] = useState<Post>();

    useEffect(() => {
        if (id) {
            getOnePost_API(id)
                .then(data => setPost(data.data))
                .catch(err => console.log(err))
        }
    }, [id]);    

    return (
        <section className={`${!post && 'flex'} mt-6 bg-white rounded-md flex-1`}>
            {
                !post ? (
                    <Spin />
                ) : (                 
                    <div className='grid md:grid-cols-2'>        
                        <div className='p-6'>
                            <h2 className='text-5xl font-semibold'>
                                {post.title}
                            </h2>    
                            <ul className='flex mt-4 gap-x-3'>
                                {
                                    (post.tags as string[]).map((tag, i) => (
                                        <li className='text-gray-400' key={`${tag}-${i}`}>
                                            #{tag}
                                        </li>
                                    ))
                                }
                            </ul>
                            <p className='mt-4'>
                                {post.message} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ex maiores nemo tempore commodi labore velit iure provident consequatur et deleniti earum odit, voluptates aperiam libero illo laudantium, itaque veniam.
                            </p>  
                            <Divider className='bg-gray-200' />
                            <p className='mt-4'>
                                <span className='mr-3 font-bold'>Realtime Chat</span>
                                <span>coming soon!</span>
                            </p>
                            <Divider className='bg-gray-200' />
                            <p className='mt-4'>
                                <span className='mr-3 font-bold'>Comments</span>
                                <span>coming soon!</span>
                            </p>
                        </div>               
                        <div className='flex items-center justify-center'>
                            <img src={post.selectedFile} className='object-cover shadow-md rounded-2xl' />
                        </div>                
                    </div>                                       
                )
            }
        </section>
    );
};

export default DetailPostPage;
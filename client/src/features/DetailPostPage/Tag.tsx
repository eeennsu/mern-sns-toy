import type { FC } from 'react';

type Props = {
    tag: string;
}

const Tag: FC<Props> = ({ tag }) => {

    return (
        <li className='my-2 text-sm italic text-gray-400'>
            #{tag}
        </li>
    );
};

export default Tag;
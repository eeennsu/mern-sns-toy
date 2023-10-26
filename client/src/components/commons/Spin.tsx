import { FC } from 'react';
import { Spin as AntdSpin } from 'antd';

type Props = {
    height?: number,
    size?: 'large' | 'small' | 'default',
}

const Spin: FC<Props> = ({ height = 450, size = 'large' }) => {

    return (
        <div className={`flex flex-1 items-center justify-center w-full`}>           
            <AntdSpin size={size} />      
        </div>
    )
}

export default Spin;
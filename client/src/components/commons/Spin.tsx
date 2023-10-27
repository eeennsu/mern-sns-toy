import { FC } from 'react';
import { Spin as AntdSpin } from 'antd';

type Props = {
    size?: 'large' | 'small' | 'default',
}

const Spin: FC<Props> = ({ size = 'large' }) => {

    return (
        <div className={`flex flex-1 items-center justify-center w-full`}>           
            <AntdSpin size={size} />      
        </div>
    )
}

export default Spin;
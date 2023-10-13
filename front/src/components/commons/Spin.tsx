import { FC } from 'react';
import { Spin as AntdSpin } from 'antd';

const Spin: FC = ({  }) => {

    return (
        <div className={`flex items-center justify-center w-full h-[450px]`}>           
            <AntdSpin size='large' />      
        </div>
    )
}

export default Spin;
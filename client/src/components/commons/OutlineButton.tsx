import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren & HTMLAttributes<HTMLButtonElement>

const OutlineButton: FC<Props> = ({ children, className, ...btnProps }) => {

    const _className = `flex items-center justify-center gap-2 px-4 py-2 font-semibold text-orange-400 uppercase transition bg-white border-2 border-orange-400 rounded-md shadow-md outline-none hover:bg-orange-500 hover:text-white active:bg-orange-600 ${className}`;

    return (
        <button className={_className}>
            {children}
        </button>
    );
};

export default OutlineButton;
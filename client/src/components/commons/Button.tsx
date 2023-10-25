import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<Props> = ({ children,  className, ...btnProps }) => {

    const _className = `flex items-center justify-center gap-2 px-4 py-2 text-white uppercase transition bg-orange-400 rounded-md shadow-md outline-none hover:bg-orange-500 active:bg-orange-600 ${className}`;

    return (
        <button {...btnProps} className={_className}>
            {children}
        </button>
    );
};

export default Button;
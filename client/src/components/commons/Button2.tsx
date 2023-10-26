import type { FC, PropsWithChildren, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type Props = PropsWithChildren & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button2: FC<Props> = ({ children,  className, ...btnProps }) => {

    const _className = `w-full px-3 py-2 text-sm text-white uppercase rounded-md shadow-lg ${className}`;

    return (
        <button {...btnProps} className={_className + ' rounded-[4px]'}>
            {children}
        </button>
    );
};

export default Button2;
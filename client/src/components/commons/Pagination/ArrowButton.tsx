import type { FC, PropsWithChildren, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type Props = PropsWithChildren & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    trigger: boolean;
}

const ArrowButton: FC<Props> = ({ children, trigger, ...buttonProps }) => {

    return (
        <button {...buttonProps} className={`${trigger && 'opacity-60 font-medium'} flex items-center justify-center w-3 h-3 p-4 text-sm font-bold border border-gray-400 rounded-full`}>
            {children}
        </button>
    );
};

export default ArrowButton;
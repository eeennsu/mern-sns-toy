import type { FC, InputHTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren & InputHTMLAttributes<HTMLInputElement>

const Input: FC<Props> = ({ children, className, ...btnProps }) => {

    const _className = `w-full px-3 py-2 text-base text-black border border-gray-300 rounded-sm outline-none bg-inherit focus:border-black placeholder:text-xs placeholder:text-gray-400/80`;

    return (
        <input {...btnProps} className={_className} />       
    );
};

export default Input;
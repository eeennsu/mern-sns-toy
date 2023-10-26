import type { FC, InputHTMLAttributes, PropsWithChildren, DetailedHTMLProps } from 'react';

type Props = PropsWithChildren & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = ({ children, className, ...inputProps }) => {

    const _className = `w-full px-3 py-2 text-base text-black border border-gray-300 rounded-sm outline-none bg-inherit focus:border-black placeholder:text-xs placeholder:text-gray-400/80`;

    return (
        <input {...inputProps} className={_className} />       
    );
};

export default Input;
import type { FC, PropsWithChildren, TextareaHTMLAttributes } from 'react';

type Props = PropsWithChildren & TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea: FC<Props> = ({ children, className, ...textareaProps }) => {
   
    const _className = ['w-full px-3 py-2 text-base text-black border border-gray-300  rounded-sm outline-none resize-none h-28 bg-inherit focus:border-black placeholder:text-xs placeholder:text-gray-400/80', className].join(' ');

    return (
        <textarea {...textareaProps} className={_className}>
            {children}
        </textarea>
    );
};

export default Textarea;
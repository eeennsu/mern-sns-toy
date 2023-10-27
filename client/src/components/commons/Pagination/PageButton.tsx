import type { FC, PropsWithChildren } from 'react';

type Props = {
    selected: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const PageButton: FC<PropsWithChildren<Props>> = ({ selected, disabled, onClick, children }) => {
    
    return (
        <div className={`${selected && 'bg-blue-100 border-gray-400'} ${disabled && 'opacity-40'} flex items-center justify-center w-3 h-3 p-4 border border-gray-300 rounded-full`}>
            <button onClick={onClick} disabled={disabled}>
                {children}
            </button>
        </div>
    );
};

export default PageButton;
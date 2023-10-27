import type { FC } from 'react';
import usePageination, { UsePaginationProps } from '../../../hooks/usePagination';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import PageButton from './PageButton';
 
const Pagination2: FC<UsePaginationProps> = ({ count, onPageChange, page, boundaryCount, disabled, siblingCount }) => {
    
    const getLabel = (item: number | string) => {
        switch(typeof item) {
            case 'number': return item;
            case 'string':
                if (item.indexOf('ellipsis')  > -1) return <AiOutlineEllipsis />
                else if (item.indexOf('prev') > -1) return <GrFormPrevious />
                else if (item.indexOf('next') > -1) return <GrFormNext />
        }
    };

    const { items } = usePageination({ count, onPageChange, page, boundaryCount, disabled, siblingCount });

    return (
        <nav role='pagination'>
            <ul className='flex justify-between'>
                {items.map(({ key, disabled, onClick, selected, item }) => (
                    <li key={key} >
                        <PageButton onClick={onClick} selected={selected} disabled={disabled}>
                            {getLabel(item)}
                        </PageButton>
                        {/* <Button onClick={onClick} selected={selected} disabled={disabled}>{getLabel(item)}</Button> */}
                    </li>
                ))}
            </ul>
        </nav>
        
    );
};

export default Pagination2;
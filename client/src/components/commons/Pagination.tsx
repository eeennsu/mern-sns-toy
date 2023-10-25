import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/actionTypes';
import { shallowEqual } from 'react-redux';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { changePage } from '../../actions/page';
import { PageButton, Spin } from '..';

type Props = {

}

const Pagination: FC<Props> = ({  }) => {

    const dispatch = useAppDispatch();
    const { curPage, totalCount, isPageLoading, isPageError } = useAppSelector(state => ({
        curPage: state.page.curPage,
        totalCount: state.page.totalCount,
        isPageLoading: state.page.isPageLoading,
        isPageError: state.page.isPageError
    }), shallowEqual);

    const handleNextPage = () => {
        const changeDispatch = changePage(curPage, 1);

        changeDispatch(dispatch);
    }

    const handlePrevPage = () => {
        const changeDispatch = changePage(curPage, -1);

        changeDispatch(dispatch);
    }

    const isFirstPage = curPage === 1;
    const isLastPage = curPage >= totalCount / 4;
    const pagesNumber = Array.from({ length: Math.ceil(totalCount / 4)}, (_, i) => i + 1);

    return (
        <section className={`relative px-8 py-4 mt-6 bg-white rounded-md shadow-md ${isPageLoading && 'bg-gray-100/60 aboslute inset-0 z-10'}}`}>
           <nav role='pagination' className='flex justify-between w-full'>
                <button onClick={handlePrevPage} disabled={isFirstPage || isPageLoading} className={`${isFirstPage && 'opacity-30' }`}>
                    <BsFillArrowLeftCircleFill className='w-5 h-5'/>
                </button>
                {
                    pagesNumber.map((num) => (
                        <PageButton key={num} num={num} />
                    ))
                }
                <button onClick={handleNextPage} disabled={isLastPage || isPageLoading} className={`${isLastPage && 'opacity-30'}`}>
                    <BsFillArrowRightCircleFill className='w-5 h-5'/>
                </button>
            </nav>        
        </section>
        
    );
};

export default Pagination;
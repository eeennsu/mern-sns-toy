import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/actionTypes';
import { shallowEqual } from 'react-redux';
import { changePage } from '../../../actions/page';
import Pagination from '../../../components/commons/Pagination/Pagination';

const PostPagenation: FC = () => {

    const dispatch = useAppDispatch();
    const { curPage, totalCount, isPageLoading } = useAppSelector(state => ({
        curPage: state.page.curPage,
        totalCount: state.page.totalCount,
        isPageLoading: state.page.isPageLoading,
    }), shallowEqual);

    const handlePageChange = (curPage: number) => {
        const changeDispatch = changePage(curPage);
  
        changeDispatch(dispatch);
    }

    // const handleNextPage = () => {
    //     const changeDispatch = changePage(curPage, 1);

    //     changeDispatch(dispatch);
    // }

    // const handlePrevPage = () => {
    //     const changeDispatch = changePage(curPage, -1);

    //     changeDispatch(dispatch);
    // }

    // const isFirstPage = curPage === 1;
    // const isLastPage = curPage >= totalCount / 4;
    // const pagesNumber = Array.from({ length: Math.ceil(totalCount / 4)}, (_, i) => i + 1);

    return (
        <section className={`relative px-4 py-4 mt-6 bg-white rounded-md shadow-md ${isPageLoading && 'bg-gray-100/60 aboslute inset-0 z-10'}`}>            
            {/* <nav role='pagination' className='w-full'>
                    <ArrowButton onClick={handlePrevPage} disabled={isFirstPage || isPageLoading} trigger={isFirstPage}>
                        &lt;
                    </ArrowButton>               
                    {
                        pagesNumber.map((num) => (
                            <PageButton key={num} num={num} />
                        ))
                    }
                    <ArrowButton onClick={handleNextPage} disabled={isLastPage || isPageLoading} trigger={isLastPage}>
                        &gt;
                    </ArrowButton>                 *
                    
            </nav>    이전 거     */}
            <Pagination count={Math.floor(totalCount / 4)} page={curPage} onPageChange={handlePageChange} />
        </section>
        
    );
};

export default PostPagenation;
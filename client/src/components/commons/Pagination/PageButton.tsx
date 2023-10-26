import type { FC } from 'react';
import { changeDirectPage } from '../../../actions/page';
import { useAppDispatch, useAppSelector } from '../../../redux/actionTypes';
import { shallowEqual } from 'react-redux';

type Props = {
    num: number;
}

const PageButton: FC<Props> = ({ num }) => {

    const dispatch = useAppDispatch();
    const { curPage, isPageLoading } = useAppSelector(state => ({
        curPage: state.page.curPage,
        isPageLoading: state.page.isPageLoading
    }), shallowEqual);

    const isCurPage = num === curPage;

    const handleChangeDirectPage = () => {
        const changeDispatch = changeDirectPage(num);

        changeDispatch(dispatch);
    }

    return (
        <div className={`${isCurPage && 'bg-blue-100 border-gray-400'}  flex items-center justify-center w-3 h-3 p-4 border border-gray-300 rounded-full`}>
            <button onClick={handleChangeDirectPage} disabled={isPageLoading}>
                {num}
            </button>
        </div>
    );
};

export default PageButton;
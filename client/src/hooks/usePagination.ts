export interface UsePaginationProps {   
    count: number;                               // 페이지의 전체 개수
    page: number;                                // 현재 페이지
    // eslint-disable-next-line
    onPageChange: (page: number) => void;            // 페이지 체인지 함수
    disabled?: boolean;                           // 비활성화
    siblingCount?: number;                       // 현재 페이지 전후에 항상 표시되는 수 
    boundaryCount?: number;                      // 시작과 끝에서 항상 표시되는 페이지의 수
}

const usePageination = ({ count, onPageChange, page, boundaryCount = 1, disabled, siblingCount = 1 }: UsePaginationProps) => {
    
    // 시작과 끝을 지정했을 때 해당하는 값들을 배열로 반환해준다.
    const range = (start: number, end: number): number[] => {        
        const length = end - start + 1;

        return Array.from({ length }).map((_, i) => i + start);
    };

    const startPage = 1;
    const endPage = count;

    const startPages = range(startPage, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    // count = 15, page = 7                       1...6,7,8...15
    // count = 4, page = 3                      ,1,..2,3,4
    // count = 8, page = 3                      1,... 2,3,4....8
    const siblingsStart = Math.max(                          // 3            2           7
            Math.min(
                page + 1 - siblingCount,                    // 3            3           7
                count - boundaryCount - siblingCount * 2 -1,// 4            0           13
            ),
            boundaryCount + 2                               // 2            2           2
        )
    ;

    // count = 15, page = 7                  
    // count = 4, page = 3                 
    // count = 8, page = 3 

    const siblingsEnd = Math.min(
        Math.max(
            page + 1 + siblingCount,                                        // 9
            boundaryCount + siblingCount * 2 + 2,                           // 6
        ),
        endPages.length > 0 ? endPages[0] - 2: endPage -1
    );

    const itemList = [
        'prev',
        ...startPages,
        ...(siblingsStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []),
        ...range(siblingsStart, siblingsEnd),
        ...(siblingsEnd < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []),
        ...endPages,
        'next'
      ];

    const items = itemList.map((item, i) => (
        typeof item === 'number' ? {
            key: i,
            onClick: () => onPageChange(item),
            disabled,
            selected: item === page,
            item,
        } : {
            key: i,
            onClick: () => onPageChange(item === 'next' ? page + 1 : page - 1),
            disabled: disabled || item.indexOf('ellipsis') > -1 || (item === 'next' ? page >= count : page <= 1),
            selected: false,
            item,
        }
    ));

    return { items };
};

export default usePageination;
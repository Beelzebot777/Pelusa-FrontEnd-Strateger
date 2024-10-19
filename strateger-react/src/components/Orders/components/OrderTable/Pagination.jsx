import { useDispatch } from 'react-redux';
import { fetchOrdersUsdtm, setPage } from '../../../../redux/order';

const Pagination = ({ page, hasMore, endIndex, orders, offset }) => {

    const dispatch = useDispatch();

    const handlePreviousPage = () => {
        dispatch(setPage(Math.max(page - 1, 0)));
      };
    
      const handleNextPage = () => {
        const nextPage = page + 1;
        if (nextPage * 20 >= orders.length && hasMore) {
          dispatch(fetchOrdersUsdtm({ limit: 500, offset }));
        }
        dispatch(setPage(nextPage));
      };

    return(        
        <div className="flex justify-between mt-4">
            <button
                className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
                page === 0
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-african_violet-500 text-white hover:bg-african_violet-700'
                }`}
                onClick={handlePreviousPage}
                disabled={page === 0}
            >
                Anterior
            </button>
            <button
                className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
                !hasMore && endIndex >= orders.length
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-african_violet-500 text-white hover:bg-african_violet-700'
                }`}
                onClick={handleNextPage}
                disabled={!hasMore && endIndex >= orders.length}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
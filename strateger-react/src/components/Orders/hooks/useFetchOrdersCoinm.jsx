
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrdersCoinm } from '../../../redux/order';
import { selectOrderCoinm, setErrorCoinm } from '../../../redux/order';

const useFetchOrdersCoinm = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectOrderCoinm);
        
    useEffect(() => {    
        if (data.length === 0){
            try {
                dispatch(fetchOrdersCoinm({ limit: 500, offset: 0 }));    
            } catch (error) {
                setErrorCoinm(error);    
            }        
        }
    }, [dispatch, data.length]);
  
}

export default useFetchOrdersCoinm;
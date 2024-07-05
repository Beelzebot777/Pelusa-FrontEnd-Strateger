// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import alarmReducer from './slices/alarmSlice';
import orderReducer from './slices/orderSlice';
import strategyReducer from './slices/strategySlice';
import diaryReducer from './slices/diarySlice';
import accountReducer from './slices/accountSlice';
import backtestingReducer from './slices/backtestingSlice';
import tradingViewChartReducer from './slices/tradingViewChartSlice';
import timeReducer from './slices/timeSlice';
import spotReducer from './slices/spotSlice';
import perpCOINMReducer from './slices/perpCOINMSlice';
import tickerReducer from './slices/tickerSlice'; // Importar tickerSlice

const store = configureStore({
  reducer: {
    time: timeReducer,
    alarms: alarmReducer,
    orders: orderReducer,
    strategies: strategyReducer,
    diary: diaryReducer,
    account: accountReducer,  
    spot: spotReducer,
    perpCOINM: perpCOINMReducer,
    backtesting: backtestingReducer,
    tradingViewChart: tradingViewChartReducer,
    ticker: tickerReducer, // Agregar tickerReducer
  },
  devTools: composeWithDevTools(),
});

export default store;

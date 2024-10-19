// src/components/TradingViewChart/hooks/useMarkers.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from '../markers/Alarms';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from '../markers/OrdersChart';
import { mapPositionsToMarkers } from '../markers/PositionsChart';

import { selectStrategyFilteredAlarms, selectFilteredByIntervalAndTypeAlarms } from '../../../redux/alarm';


import { selectFilteredOrders } from '../../../redux/order';
import { selectBacktestingResult } from '../../../redux/backtesting/backtestingSlice';
import { setAlarmMarkers, setOrderMarkers, setPositionMarkers, selectAlarmMarkers, selectOrderMarkers, selectPositionMarkers } from '../../../redux/tradingViewChart/tradingViewChartSlice';

const useMarkers = (candlestickSeriesRef, chartInterval) => {
  const dispatch = useDispatch();
  const strategyFilteredAlarms = useSelector(selectStrategyFilteredAlarms);
  const allSelectedAlarms = useSelector(selectFilteredByIntervalAndTypeAlarms);
  const filteredOrders = useSelector(selectFilteredOrders);
  const backtestingResult = useSelector(selectBacktestingResult);
  const alarmMarkers = useSelector(selectAlarmMarkers);
  const orderMarkers = useSelector(selectOrderMarkers);
  const positionMarkers = useSelector(selectPositionMarkers);

  useEffect(() => {
    let newAlarmMarkers = [];
    if (strategyFilteredAlarms.length > 0) {
      newAlarmMarkers = mapAlarmsToMarkers(strategyFilteredAlarms, chartInterval);
    } else if (allSelectedAlarms.length > 0) {
      newAlarmMarkers = mapAlarmsToMarkers(allSelectedAlarms, chartInterval);
    }
    const sortedAlarmMarkers = sortAndFilterAlarmMarkers(newAlarmMarkers).sort((a, b) => a.time - b.time);
    dispatch(setAlarmMarkers(sortedAlarmMarkers));
  }, [strategyFilteredAlarms, allSelectedAlarms, chartInterval, dispatch]);

  useEffect(() => {
    let newOrderMarkers = [];
    if (filteredOrders.length > 0) {
      newOrderMarkers = mapOrdersToMarkers(filteredOrders, chartInterval);
    }
    const sortedOrderMarkers = sortAndFilterOrderMarkers(newOrderMarkers).sort((a, b) => a.time - b.time);
    dispatch(setOrderMarkers(sortedOrderMarkers));
  }, [filteredOrders, chartInterval, dispatch]);

  useEffect(() => {
    if (backtestingResult && backtestingResult.positions) {
      const newPositionMarkers = mapPositionsToMarkers(backtestingResult.positions);
      dispatch(setPositionMarkers(newPositionMarkers));
    }
  }, [backtestingResult, dispatch]);

  useEffect(() => {
    if (candlestickSeriesRef.current) {
      const combinedMarkers = [...alarmMarkers, ...orderMarkers, ...positionMarkers]
        .filter(marker => !isNaN(marker.time)) // Filter out markers with invalid times
        .sort((a, b) => a.time - b.time);

      candlestickSeriesRef.current.setMarkers(combinedMarkers);
    }
  }, [alarmMarkers, orderMarkers, positionMarkers, candlestickSeriesRef]);
};

export default useMarkers;

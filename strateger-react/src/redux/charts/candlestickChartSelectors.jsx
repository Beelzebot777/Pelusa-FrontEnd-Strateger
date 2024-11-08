export const selectCandlestickChartData = state => state.candlestickChart.data;
export const selectCandlestickChartStartDate = state => state.candlestickChart.startDate;
export const selectCandlestickChartEndDate = state => state.candlestickChart.endDate;
export const selectCandlestickChartInterval = state => state.candlestickChart.interval;
export const selectAlarmMarkers = state => state.candlestickChart.alarmMarkers;
export const selectOrderMarkers = state => state.candlestickChart.orderMarkers;
export const selectPositionMarkers = state => state.candlestickChart.positionMarkers;

export const selectCandlestickChartLoading = state => state.candlestickChart.loading;
export const selectCandlestickChartError = state => state.candlestickChart.error;
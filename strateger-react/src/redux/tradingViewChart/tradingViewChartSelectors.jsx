export const selectTradingViewChartData = state => state.tradingViewChart.data;
export const selectTradingViewChartLoading = state => state.tradingViewChart.loading;
export const selectTradingViewChartError = state => state.tradingViewChart.error;
export const selectTradingViewChartStartDate = state => state.tradingViewChart.startDate;
export const selectTradingViewChartEndDate = state => state.tradingViewChart.endDate;
export const selectTradingViewChartInterval = state => state.tradingViewChart.interval;
export const selectLastPrice = state => state.tradingViewChart.lastPrice;
export const selectAlarmMarkers = state => state.tradingViewChart.alarmMarkers;
export const selectOrderMarkers = state => state.tradingViewChart.orderMarkers;
export const selectPositionMarkers = state => state.tradingViewChart.positionMarkers;
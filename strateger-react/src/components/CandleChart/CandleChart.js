import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import AnnotationsModule from 'highcharts/modules/annotations';
import { fetchData } from './fetchData';

AnnotationsModule(Highcharts);

const CandleStickChart = ({ initialTemporalidad, initialStartDate, initialEndDate, setStartDate, setEndDate }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(initialTemporalidad);
  const [activeInterval, setActiveInterval] = useState(initialTemporalidad);

  // Initialize the dates with the props received
  const [startDateState, setStartDateState] = useState(initialStartDate);
  const [endDateState, setEndDateState] = useState(initialEndDate);
  
  const chartComponentRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData(interval, startDateState, endDateState, setData, setError, setLoading);
    };

    loadData();
  }, [interval, startDateState, endDateState]);

  const handleIntervalChange = (newInterval) => {
    console.log('Interval selected:', newInterval);
    setActiveInterval(newInterval);
    setInterval(newInterval);
  };

  const options = {
    chart: {
      type: 'candlestick',
    },
    navigator: {
      enabled: false // Disable the navigator
    },
    rangeSelector: {
      selected: 4,  // Initially select the "All" option (index 4)
      inputEnabled: true,
      buttons: [
        {
          type: 'month',
          count: 1,
          text: '1M',
        },
        {
          type: 'month',
          count: 3,
          text: '3M',
        },
        {
          type: 'month',
          count: 6,
          text: '6M',
        },
        {
          type: 'year',
          count: 1,
          text: '1Y',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      inputDateFormat: '%Y-%m-%d',
      events: {
        afterSetExtremes: function (e) {
          const newStartDate = new Date(e.min).toISOString().slice(0, 19).replace('T', ' ');
          const newEndDate = new Date(e.max).toISOString().slice(0, 19).replace('T', ' ');
          console.log('New start date:', newStartDate);
          console.log('New end date:', newEndDate);
          setStartDate(newStartDate);
          setEndDate(newEndDate);
          setStartDateState(newStartDate); // Update local state
          setEndDateState(newEndDate); // Update local state
        },
      },
    },
    title: {
      text: 'Candlestick Chart'
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Price'
      },
      opposite: true
    },
    series: [{
      name: 'Candlestick',
      data: data,
      color: 'red', // Color for bearish candles
      upColor: 'green', // Color for bullish candles
      lineColor: 'red', // Border color for bearish candles
      upLineColor: 'green', // Border color for bullish candles
      tooltip: {
        valueDecimals: 2
      },
      dataGrouping: {
        enabled: false // Disable data grouping
      }
    }],
    plotOptions: {
      candlestick: {
        lineColor: 'black',
        upLineColor: 'black',
        color: 'red',
        upColor: 'green'
      }
    },
    tooltip: {
      split: true // Split tooltip into multiple boxes, one for each series
    }
  };

  const buttonClasses = (interval) =>
    `py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 ${
      activeInterval === interval ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
    }`;

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button className={buttonClasses('1m')} onClick={() => handleIntervalChange('1m')}>
          1m
        </button>        
        <button className={buttonClasses('5m')} onClick={() => handleIntervalChange('5m')}>
          5m
        </button>
        <button className={buttonClasses('15m')} onClick={() => handleIntervalChange('15m')}>
          15m
        </button>
        <button className={buttonClasses('30m')} onClick={() => handleIntervalChange('30m')}>
          30m
        </button>
        <button className={buttonClasses('1h')} onClick={() => handleIntervalChange('1h')}>
          1h
        </button>        
        <button className={buttonClasses('4h')} onClick={() => handleIntervalChange('4h')}>
          4h
        </button>        
        <button className={buttonClasses('1d')} onClick={() => handleIntervalChange('1d')}>
          1d
        </button>        
        <button className={buttonClasses('1w')} onClick={() => handleIntervalChange('1w')}>
          1w
        </button>
        <button className={buttonClasses('1M')} onClick={() => handleIntervalChange('1M')}>
          1M
        </button>
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <p className="text-lg font-bold">Loading...</p>
          </div>
        )}
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
          ref={chartComponentRef}
        />
      </div>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default CandleStickChart;

// Path: strateger-react/src/App.js

import React from 'react';
import AlarmList from './components/AlarmList';
import CandleChart from './components/CandleChart/CandleChart';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-10">
        <div className="border-4 border-blue-500 p-4">
          <CandleChart />
        </div>
      </div>
      <div className="border-4 border-orange-500 grid grid-cols-1 gap-4 mt-4">
        <div>
          <AlarmList />
        </div>
      </div>
    </div>
  );
};

export default App;

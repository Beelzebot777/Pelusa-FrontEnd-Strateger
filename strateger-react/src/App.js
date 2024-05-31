// Path: strateger-react/src/App.js

import React from 'react';
import AlarmList from './components/AlarmList';
import CandleChart from './components/CandleChart';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-10">
        <div className="border-4 border-gray-500 pb-40 pr-20">
          <CandleChart width={400} height={400} />          
        </div>
        <div className="border-4 border-gray-500 pb-40 pr-20">
          <CandleChart width={400} height={400} />          
        </div>        
      </div>
      <div className="border-4 border-orange-500 grid grid-cols-1 gap-4">
        <div>
          <AlarmList />          
        </div>        
      </div>      
    </div>
  );
};

export default App;

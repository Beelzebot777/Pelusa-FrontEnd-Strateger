// Path: strateger-react/src/components/Account/AccountSummary/PerpCOINMSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerpCOINMBalance, selectPerpCOINM } from '../../../slices/accountSlice';
import { selectLastPrice } from '../../../slices/tradingViewChartSlice';
import { Switch } from '@headlessui/react';

const PerpCOINMSummary = () => {
  const dispatch = useDispatch();
  const { balances, loading, error } = useSelector(selectPerpCOINM);
  const lastPrice = useSelector(selectLastPrice);
  const [showInBTC, setShowInBTC] = useState(true);

  useEffect(() => {
    dispatch(fetchPerpCOINMBalance());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (balances.length === 0) {
    return <div>No balances available</div>;
  }

  const balance = balances[0];
  
  const displayValue = (value) => showInBTC ? parseFloat(value).toFixed(6) : (lastPrice ? (parseFloat(value) * lastPrice).toFixed(2) : 'N/A');
  const currencyLabel = showInBTC ? 'BTC' : 'USD';

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Perp COIN-M Summary</h3>
      <div className="flex items-center mb-4">
        <span className="mr-2">{currencyLabel}</span>
        <Switch
          checked={showInBTC}
          onChange={setShowInBTC}
          className={`${showInBTC ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span className={`${showInBTC ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`} />
        </Switch>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Asset</h4>
          <p className="text-2xl">{showInBTC ? 'BTC' : 'USD'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Balance</h4>
          <p className="text-2xl">{displayValue(balance.balance)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Equity</h4>
          <p className="text-2xl">{displayValue(balance.equity)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Unrealized Profit</h4>
          <p className="text-2xl">{displayValue(balance.unrealizedProfit)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Available Margin</h4>
          <p className="text-2xl">{displayValue(balance.availableMargin)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Used Margin</h4>
          <p className="text-2xl">{displayValue(balance.usedMargin)}</p>
        </div>
      </div>
    </div>
  );
};

export default PerpCOINMSummary;
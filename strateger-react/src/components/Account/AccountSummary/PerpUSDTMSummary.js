// Path: strateger-react/src/components/Account/AccountCharts/PerpUSDTMSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@headlessui/react';

import {
  fetchPerpUSDTMBalance,
  selectPerpUSDTM,
  updateTotalBalanceInUSD,
} from '../../../redux/slices/accountSlice';

import Tarjetitas from '../../common/Tarjetitas';

const PerpUSDTMSummary = ({ lastPrice, LoadingOverlay }) => {
  const dispatch = useDispatch();
  const { dataUSD, loading, error, loaded } = useSelector(selectPerpUSDTM);
  const [showInUSD, setShowInUSD] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para cargar datos si aún no se han cargado
  useEffect(() => {
    if (!loaded && lastPrice) {
      dispatch(fetchPerpUSDTMBalance({ lastPrice }));
    }
  }, [dispatch, loaded, lastPrice]);

  // Efecto para actualizar el balance total en USD
  useEffect(() => {
    if (loaded) {
      dispatch(updateTotalBalanceInUSD());
    }
  }, [loaded, dataUSD, dispatch]);

  // Efecto para manejar el estado de carga local
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else if (loaded && dataUSD) {
      setIsLoading(false);
    }
  }, [loading, loaded, dataUSD]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dataUSD) {
    return <div className="relative mb-4"><LoadingOverlay isLoading={isLoading} /></div>;      
  }

  const displayValue = (value) =>
    showInUSD ? parseFloat(value).toFixed(2) : lastPrice ? (parseFloat(value) / lastPrice).toFixed(6) : 'N/A';
  const currencyLabel = showInUSD ? 'USD' : 'BTC';

  return (
    <div className="relative mb-4">
      <LoadingOverlay isLoading={isLoading} /> {/* Mostrar overlay de carga */}      
      <div className="flex items-center mb-4">
        <span className="mr-2">{currencyLabel}</span>
        <Switch
          checked={showInUSD}
          onChange={setShowInUSD}
          className={`${
            showInUSD ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span
            className={`${
              showInUSD ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
          />
        </Switch>
      </div>
      <div className="grid grid-cols-2 gap-4">        
        <Tarjetitas descripcion="Asset" contenido={currencyLabel} />
        <Tarjetitas descripcion="Balance" contenido={displayValue(dataUSD.balance)} />
        <Tarjetitas descripcion="Equity" contenido={displayValue(dataUSD.equity)} />
        <Tarjetitas descripcion="Unrealized Profit" contenido={displayValue(dataUSD.unrealizedProfit)} />
        <Tarjetitas descripcion="Realised Profit" contenido={displayValue(dataUSD.realisedProfit)} />
        <Tarjetitas descripcion="Available Margin" contenido={displayValue(dataUSD.availableMargin)} />
        <Tarjetitas descripcion="Used Margin" contenido={displayValue(dataUSD.usedMargin)} />        
      </div>
    </div>
  );
};

export default PerpUSDTMSummary;

import { LinearProgress } from '@mui/material';
import useAxios from 'axios-hooks';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  Ticker as TickerType,
  TickerServiceResponse,
} from '../../entities/ticker';
import Ticker from '../Ticker/Ticker';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ErrorMessage = styled.div`
  font-size: 8px;
  color: red;
`;
const LoaderHolder = styled.div`
  height: 20px;
`;
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

function TickersList() {
  const [{ data, loading, error }, refetch] =
    useAxios<TickerServiceResponse>('/mock.json');
  // Data is updated every minute on server
  useEffect(() => {
    refetch();
    const handle = setInterval(() => refetch(), 60 * 1000);
    return () => {
      clearInterval(handle);
    };
  }, [refetch]);

  const tickers = useMemo(() => {
    const result = Object.values(data || {}).filter(notEmpty);
    result.sort((a: TickerType, b: TickerType) => {
      return a.base.localeCompare(b.base);
    });
    return result;
  }, [data]);

  return (
    <>
      {!!error && (
        <ErrorMessage>Error fetching data: {error.message}</ErrorMessage>
      )}
      <LoaderHolder>{loading && <LinearProgress />}</LoaderHolder>
      <ListWrapper>
        {tickers.map((ticker) => (
          <Ticker key={ticker.base} ticker={ticker} />
        ))}
      </ListWrapper>
    </>
  );
}

export default TickersList;

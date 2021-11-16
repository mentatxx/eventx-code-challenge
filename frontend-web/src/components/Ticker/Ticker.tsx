import React from 'react';
import styled from 'styled-components';
import { Ticker as TickerType } from '../../entities/ticker';

interface TickerProps {
  ticker: TickerType;
}

const abbrToNameMap: Record<string, string> = {
  BTC: 'Bitcoin',
};

function nameFromAbbr(abbr: string): string {
  return abbrToNameMap[abbr] || abbr;
}

export const Wrapper = styled.div`
  width: 260px;
  max-width: 100%;
  height: 160px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
`;
export const Name = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
`;
export const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #f6b253;
  margin-bottom: 16px;
`;
export const Details = styled.div`
  display: flex;
  color: #b5b5b5;
  margin-bottom: 8px;
  line-height: 1.2;
`;
export const Volume = styled.div`
  flex: 0 0 50%;
`;
export const Change = styled.div<{ negative: boolean }>`
  flex: 0 0 50%;

  span {
    color: ${({ negative }) => (negative ? 'red' : 'green')};
  }
`;

function Ticker({ ticker: { base, price, volume, change } }: TickerProps) {
  const negative = change.charAt(0) === '-';
  return (
    <Wrapper>
      <Name>{nameFromAbbr(base)}</Name>
      <Price>${price}</Price>
      <Details>
        <Volume>
          volume:
          <br />
          {volume}
        </Volume>
        <Change negative={negative}>
          change:
          <br />
          <span>{change}</span>
        </Change>
      </Details>
    </Wrapper>
  );
}

export default Ticker;

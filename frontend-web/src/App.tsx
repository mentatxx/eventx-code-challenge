import React from 'react';
import styled from 'styled-components';
import './App.css';
import TickersList from './components/TickersList/TickersList';

const Header = styled.h1`
  font-size: 36px;
`;

const AppWrapper = styled.div`
  padding: 20px 10px 20px 20px;
`;

function App() {
  return (
    <AppWrapper>
      <Header>Cryptocurrency Realtime Price</Header>
      <TickersList />
    </AppWrapper>
  );
}

export default App;

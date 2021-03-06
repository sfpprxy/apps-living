import React, { Component, PropTypes } from 'react';
import Todos from 'Todos/Todos';
import Accommodation from '../Accommodation';
import Test from '../Accommodation';
import Test0 from './Test0';
import Test1 from './Test1';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const App = ({ location }) => {
  return (
    <MainLayout>
      <Todos location={location} />
      <Accommodation />
    </MainLayout>
  );
};

App.propTypes = {
};

export default App;

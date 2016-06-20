import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';
import StudentTable from './StudentTable';
import Test from './Test';
import Test0 from './Test0';
import MainLayout from '../layouts/MainLayout/MainLayout';

const App = ({ location }) => {
  return (
    <MainLayout>
      <Todos location={location} />
      <StudentTable />
      <Test />
      <Test0 />
    </MainLayout>
  );
};

App.propTypes = {
};

export default App;

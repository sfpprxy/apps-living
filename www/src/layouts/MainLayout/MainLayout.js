import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import styles from './MainLayout.less';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        <h1>Todo App</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.side}>
          <h2>Filters:</h2>
          <Link to="/">All</Link><br />
          <Link to="/actived">Actived</Link><br />
          <Link to="/completed">Completed</Link><br />
          <Link to="/404">404</Link><br />
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>

    </div>
  );
};

// Warning: Failed propType: Invalid prop `children` supplied to `MainLayout`, expected a single ReactElement.
// Check the render method of `App`. (see code below)

// MainLayout.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default MainLayout;

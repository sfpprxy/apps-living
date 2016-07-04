import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import styles from './App.less';
import {Menu, Icon} from 'antd';

export default class App extends React.Component{
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.head}>
          <h1 ><Link className={styles.title} to="/">Apps Living Management</Link></h1>
        </div>
        <div className={styles.content}>
          <div className={styles.side}>
            <Menu style={{ width: 200 }}>
              <Menu.Item><Link to="/"><Icon type="book" />Parcel</Link></Menu.Item>
              <Menu.Item><Link to="/house"><Icon type="home" />House</Link></Menu.Item>
            </Menu>
          </div>
          <div className={styles.main}>
            {this.props.children}
          </div>
        </div>
    </div>
    );
  }
}

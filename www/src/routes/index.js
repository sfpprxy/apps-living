import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import App from '../components/App';
import Accommodation from '../components/Accommodation'
import NewRoom from '../components/NewRoom'
import HouseSelector from '../components/HouseSelector'
import NotFound from '../components/NotFound';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/accommodation" component={Accommodation} />
      <Route path="/newroom" component={NewRoom} />
    </Route>
    <Route path="/HouseSelector" component={HouseSelector} />
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;

import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import App from '../components/App';
import House from '../components/House'
import NewRoom from '../components/NewRoom'
import EditRoom from '../components/EditRoom'
import HouseSelector from '../components/HouseSelector'
import NotFound from '../components/NotFound';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/house" component={House} />
      <Route path="/new-room" component={NewRoom} />
      <Route path="/edit-room" component={EditRoom} />
    </Route>
    <Route path="/HouseSelector" component={HouseSelector} />
    <Route path="*" component={App}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;

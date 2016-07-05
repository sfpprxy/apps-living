import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import App from '../components/App';
import House from '../components/House'
import NewRoom from '../components/NewRoom'
import EditRoom from '../components/EditRoom'
import Parcel from '../components/Parcel'

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/parcel" component={Parcel} />
      <Route path="/house" component={House} />
      <Route path="/new-room" component={NewRoom} />
      <Route path="/edit-room" component={EditRoom} />
    </Route>
    <Route path="*" component={App}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;

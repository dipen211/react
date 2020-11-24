import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Employees from './components/Employees';
import Create from './components/Employees/Create';
import EditCustomer from './components/Employees/Edit';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Employees </Link>
            </li>
            <li>
              <Link to={'/create'}> Create Customer </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/'} exact component={Employees} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
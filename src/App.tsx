import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Employees from './pages/Employees';
import Create from './pages/Employee/Create';
import EditCustomer from './pages/Employee/Edit';
import Navbar from './header/navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import ErrorBoundary from './HOC/ErrorBoundry';
import NotFound from "./pages/NotFound";
class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div className="App">
        <ErrorBoundary>
        <Navbar />
        <Switch>
          <Route path={'/'} exact component={Employees} />
          <Route path={'/create/:id'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />
          <Route component={NotFound} />
        </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}
export default withRouter(App);
import React, { Suspense } from 'react';
import { Redirect, Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import TopBar from './components/TopBar';
import ReservationList from './components/ReservationList';
import { history } from "./common/history"
import CreateAndEditReservation from './components/CreateAndEditReservation';
import EditReservation from './components/EditReservation';

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TopBar/>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/reservations"
              component={ReservationList}
            />
            <Route
              exact
              path="/"
              render={() => <Redirect to="/reservations" />}
            />
            <Route
              exact
              path="/reservations/create"
              component={CreateAndEditReservation}
            />
            <Route
              path="/reservations/:reservationId/edit"
              component={EditReservation}
            />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
};

export default App;

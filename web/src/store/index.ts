import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reservationListReducer from "./reservationList/reducer";
import { ReservationListState } from "./reservationList/types";

export interface ApplicationState {
  reservationList: ReservationListState
}

const reducers = combineReducers({
  reservationList: reservationListReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

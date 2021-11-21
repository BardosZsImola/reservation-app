import { Reducer } from "redux";
import { ReservationListActionTypes, ReservationListState } from "./types";

const initialState: ReservationListState = {
  data: [],
  loading: false
};

const reservationsListReducer: Reducer<ReservationListState> = (state = initialState, action): ReservationListState => {
  switch (action.type) {
    case ReservationListActionTypes.GET_ALL_BEGIN
    || ReservationListActionTypes.REMOVE_BEGIN 
    || ReservationListActionTypes.CREATE_BEGIN 
    || ReservationListActionTypes.UPDATE_BEGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case ReservationListActionTypes.GET_ALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }
    case ReservationListActionTypes.REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case ReservationListActionTypes.REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reservationsListReducer;

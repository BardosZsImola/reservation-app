import { Action, Dispatch } from "redux";
import { Reservation, ReservationListActionTypes } from "./types";
import { deleteReservation, findAllReservations, createReservation, updateReservation } from "../../apiRequests/reservation";

const getAllReservationsBegin = () => ({
  type: ReservationListActionTypes.GET_ALL_BEGIN
})

const getAllReservationsSucces = (data: Reservation[]) => ({
  type: ReservationListActionTypes.GET_ALL_SUCCESS,
  payload: data
})

const requestError = (error: string | null) => ({
  type: ReservationListActionTypes.REQUEST_ERROR,
  payload: error
})

const requestSucces = () => ({
  type: ReservationListActionTypes.REQUEST_SUCCESS
})

export const getAllReservations = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(getAllReservationsBegin());
    try {
      const result = await findAllReservations();
      dispatch(getAllReservationsSucces(result));
    } catch(error) {
      dispatch(requestError(error as string))
    }
  };
};

const removeRequesBegin = () => ({
  type: ReservationListActionTypes.REMOVE_BEGIN
})

const createRequesBegin = () => ({
  type: ReservationListActionTypes.CREATE_BEGIN
})

const updateRequesBegin = () => ({
  type: ReservationListActionTypes.UPDATE_BEGIN
})

export const removeReservation = (item: Reservation) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(removeRequesBegin());
    try {
      await deleteReservation(item._id);
      dispatch(requestSucces());
      dispatch<any>(getAllReservations());
    } catch(error) {
      dispatch(requestError(error as string))
    }
  };
};

export const addNewReservation = (data: Reservation) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(createRequesBegin());
    try {
      const result = await createReservation(data);
      dispatch(requestSucces());
      dispatch<any>(getAllReservations());
    } catch(error) {
      dispatch(requestError(error as string))
    }
  };
};

export const editReservation = (data: Reservation) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(removeRequesBegin());
    try {
      const result = await updateReservation(data);
      dispatch(requestSucces());
      dispatch<any>(getAllReservations());
    } catch(error) {
      dispatch(requestError(error as string))
    }
  };
};

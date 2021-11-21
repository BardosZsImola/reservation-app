export interface Reservation {
  _id: string;
  name: string;
  dateAndTime: Date;
  numberOfGuests: string;
  email?: string;
}

export interface ReservationListState {
  data: Reservation[];
  loading: boolean;
  error?: string;
}

export enum ReservationListActionTypes {
  GET_ALL_BEGIN = '@@reservationList/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@reservationList/GET_ALL_SUCCESS',
  REMOVE_BEGIN = '@@reservationList/REMOVE_BEGIN',
  UPDATE_BEGIN = '@@reservationList/UPDATE_BEGIN',
  CREATE_BEGIN = '@@reservationList/CREATE_BEGIN',
  REQUEST_SUCCESS = '@@reservationList/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@reservationList/REQUEST_ERROR',
}

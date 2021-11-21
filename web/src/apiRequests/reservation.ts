import { Reservation } from '../store/reservationList/types';
import { baseApiUrl } from '../util/config';

type BadResponse = {
  message: string;
};

export const findAllReservations = async (): Promise<Reservation[]> => {
  const response = await fetch(`${baseApiUrl}/reservations`);
  if (!response.ok) {
    const result = (await response.json()) as BadResponse;
    throw new Error(result.message);
  }
  const entities = (await response.json()) as Reservation[];
  return entities;
};

export const findReservationById = async (id: string): Promise<Reservation> => {
  const response = await fetch(`${baseApiUrl}/reservations/${id}`);
  if (!response.ok) {
    const result = (await response.json()) as BadResponse;
    throw new Error(result.message);
  }
  const entity = (await response.json()) as Reservation;
  return entity;
};

export const createReservation = async (data: Reservation): Promise<Reservation> => {
  const response = await fetch(`${baseApiUrl}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = (await response.json()) as BadResponse;
    throw new Error(result.message);
  }
  const entity = (await response.json()) as Reservation;
  return entity;
};

export const updateReservation = async (data: Reservation): Promise<Reservation> => {
  const response = await fetch(`${baseApiUrl}/reservations/${data._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = (await response.json()) as BadResponse;
    throw new Error(result.message);
  }
  const entity = (await response.json()) as Reservation;
  return entity;
};

export const deleteReservation = async (id: string): Promise<void> => {
  const response = await fetch(`${baseApiUrl}/reservations/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const result = (await response.json()) as BadResponse;
    throw new Error(result.message);
  }
};

import { BaseEntity } from './base';

export interface Reservation extends BaseEntity {
  name: string,
  dateAndTime: Date,
  numberOfGuests: number,
  email?: string
}

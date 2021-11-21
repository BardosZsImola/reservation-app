import { Reservation } from '../model/reservation.model';
import ReservationRepository from '../repo/reservation.repo';
import Controller from './base.controller';

export default class ReservationController extends Controller<Reservation> {

  constructor() {
    
    super(ReservationRepository);
  }

}

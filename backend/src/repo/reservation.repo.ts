import { Reservation } from '../model/reservation.model';
import { reservationData } from '../util/database';

export class ReservationRepository {

  findAll(): Reservation[] {
    return reservationData;
  }

  findById(_id: number): Reservation | null {
    const entities: Reservation[] = reservationData.filter(reservation => reservation._id === _id);
    if (entities.length === 0) 
      return null;
    return entities[0];
  }

  create(entity: Reservation): Reservation {
    const newId = reservationData[reservationData.length - 1]._id + 1;
    entity._id = newId;
    reservationData.push(entity);
    return entity;
  }

  update(entity: Reservation): Reservation {
    const index = reservationData.map((reservation) => reservation._id).indexOf(entity._id);
    reservationData[index] = entity;
    return entity;
  }

  delete(_id: number): void {
    const index = reservationData.map((reservation) => reservation._id).indexOf(_id);
    reservationData.splice(index, 1);
  }

}

export default new ReservationRepository();

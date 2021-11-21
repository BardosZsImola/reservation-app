import { Reservation } from "../model/reservation.model";
import { User } from "../model/user.model";

export let reservationData: Reservation[] = [
  {
    _id: 0,
    name: "Nagy Ervin",
    dateAndTime: new Date("2021-11-24T15:00:00.000+02:00"),
    numberOfGuests: 2,
    email: "nagy.ervin@gmail.com"
  },
  {
    _id: 1,
    name: "Fulop Sandor",
    dateAndTime: new Date("2021-11-24T15:15:00.000+02:00"),
    numberOfGuests: 3,
    email: "fulop.sandor@gmail.com"
  },
  {
    _id: 2,
    name: "Horvath Marton",
    dateAndTime: new Date("2021-11-24T15:30:00.000+02:00"),
    numberOfGuests: 2,
    email: "horvath.marton@gmail.com"
  },
  {
    _id: 3,
    name: "Ballok Eva",
    dateAndTime: new Date("2021-11-24T15:45:00.000+02:00"),
    numberOfGuests: 4,
    email: "ballok.eva@gmail.com"
  }
];

export let userData: User[] = [
  {
    _id: 0,
    username: "Bulgakov"
  },
  {
    _id: 1,
    username: "Souper"
  },
  {
    _id: 2,
    username: "Planetraium"
  },
  {
    _id: 3,
    username: "Bleriot"
  }
];
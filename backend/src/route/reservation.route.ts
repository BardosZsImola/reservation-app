import { Router } from 'express';
import ReservationController from '../controller/reservation.controller';

const router: Router = Router();
const controller = new ReservationController();

router.route('/')
  .get(controller.findAll)
  .post(controller.create)

router.route('/:id')
  .all(controller.findByIdMw)
  .get(controller.findById)
  .patch(controller.update)
  .delete(controller.delete);

export default router;

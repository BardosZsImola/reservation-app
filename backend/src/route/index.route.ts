import { Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import reservationRoutes from './reservation.route';
import authRoutes from './auth.route';
import { cookieSecret } from '../util/config';

const router = Router();

router.use(cookieParser(cookieSecret));
router.use(morgan('tiny'));
router.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'DELETE', 'PATCH'],
      credentials: true,
    })
);

// API endpointok a megfelelő alrouterbe
router.use('/reservations', reservationRoutes);
router.use(authRoutes);

export default router;

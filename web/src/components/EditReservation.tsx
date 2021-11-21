import React, { Suspense } from 'react';
import { RouteComponentProps } from 'react-router';
import CreateAndEditReservation from './CreateAndEditReservation';

interface PropsFromPath {
  reservationId: string;
}

type AllProps = RouteComponentProps<PropsFromPath>;

const EditReservation: React.FC<AllProps> = ({ match }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAndEditReservation reservationId={match.params.reservationId} />
    </Suspense>
  );
};

export default EditReservation;

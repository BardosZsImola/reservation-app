import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Reservation } from "../store/reservationList/types";
import { removeReservation } from "../store/reservationList/action";
import { Alert, Button, Card, Elevation, Icon } from "@blueprintjs/core";
import { history } from "../common/history";
import { specialDateFormat } from "../common/dateService";

const ReservationCard = styled(Card)`
  background-color: white;
  padding: 10px;
  margin: 15px;
  flex: 0 0 30%;
`;

const ProfileImg = styled.img`
  width: 40%;
  margin: auto;
  display: block;
`;

const ProductHeader = styled.h2`
  
`;

const ReservationInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;

const InfoIcon = styled(Icon)`
  padding-right: 5px;
`;

const ButtonContainer = styled.div`
  text-align:center;
`

const CardButton = styled(Button)`
  width: 30%;
  margin: 15px;
`

interface propsFromComponent {
  item: Reservation;
  index: number;
}

interface propsFromDispatch {
  deleteReservation: (item: any) => any;
}

type Props = propsFromComponent & propsFromDispatch;

const ReservationItem: React.FC<Props> = ({
  item,
  index,
  deleteReservation
}) => {

  const [isAlert, setIsAlert] = useState<boolean>(false);

  const confirmDeletion = () => {
    deleteReservation(item);
  }

  const cancelDeletion = () => {
    setIsAlert(false);
  }

  const editReservation = () => {
    history.push(`/reservations/${item._id}/edit`);
  };

  return (
    <ReservationCard elevation={Elevation.TWO}>
      <ProductHeader>reservation #{index}</ProductHeader>
      <ProfileImg src="no-face.jpg" />
      <ProductHeader>{item.name}</ProductHeader>
      <ReservationInfo>
        <InfoIcon icon="people" />
        <span>Reservation for {item.numberOfGuests} people</span>
      </ReservationInfo>
      <ReservationInfo>
        <InfoIcon icon="calendar" />
        <span>{specialDateFormat(new Date(item.dateAndTime))}</span>
      </ReservationInfo>
      <ReservationInfo>
        <InfoIcon icon="envelope" />
        <span>{item.email}</span>
      </ReservationInfo>
      <ButtonContainer>
        <CardButton onClick={() => setIsAlert(true)}>Delete</CardButton>
        <CardButton onClick={() => editReservation()}>Edit</CardButton>
      </ButtonContainer>
      {isAlert &&
        <Alert
          isOpen={true}
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
        >
          Are you sure you want to delete reservation #{index}?
        </Alert>
      }
    </ReservationCard>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    deleteReservation: (item: Reservation) => { 
      dispatch(removeReservation(item))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationItem);

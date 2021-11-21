import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ApplicationState } from "../store";
import { getAllReservations } from "../store/reservationList/action";
import { Reservation } from "../store/reservationList/types";
import ReservationItem from "./ReservationItem";

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: auto;
`;

const ReservationListItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface PropsFromState {
  data: Reservation[];
  loading: boolean;
  error?: string;
}

interface PropsFromDispatch {
  getAllReservations: () => any;
}

type AllProps = PropsFromState & PropsFromDispatch;

const ReservationList: React.FC<AllProps> = ({
  data,
  loading,
  error,
  getAllReservations
}) => {

  useEffect(() => {
    getAllReservations();
  }, []);

  if (error) {
    return (<div>Something went wrong. Try again.</div>)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <ReservationListItems>
          {data.map((item, index) => {
            return <ReservationItem item={item} index={index} />;
          })}
        </ReservationListItems>
      </Container>
    </Suspense>
  );
};

const mapStateToProps = ({ reservationList }: ApplicationState) => ({
  loading: reservationList.loading,
  error: reservationList.error,
  data: reservationList.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getAllReservations: () => {
      dispatch(getAllReservations());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList);

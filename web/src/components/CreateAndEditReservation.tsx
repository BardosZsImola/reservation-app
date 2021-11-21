import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Button, Card, Elevation, FormGroup, InputGroup, Label } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { Reservation } from '../store/reservationList/types';
import { addNewReservation, editReservation } from '../store/reservationList/action';
import { findReservationById } from '../apiRequests/reservation';
import { getMomentFormatter, maxHour, minHour } from '../common/dateService';
import { history } from '../common/history';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8%;
`;

const FormCard = styled(Card)`
  flex: 0 0 35%;
`;

const ErrorLabel = styled(Label)`
  color: #db3737;
`;

const SubmitButton = styled(Button)<{ isUpdateMethod: boolean }>`
  text: ${(props) => (props.isUpdateMethod ? 'Edit' : 'Add')};
  width: 20%;
  font-weight: bold;
`;

const initialReservationState: Reservation = {
  _id: '',
  name: '',
  dateAndTime: new Date(),
  numberOfGuests: '',
  email: '',
};

type FieldErrorsState = {
  name: string;
  dateAndTime: string;
  numberOfGuests: string;
  email: string;
};

const initialFieldErrorsState: FieldErrorsState = {
  name: '',
  dateAndTime: '',
  numberOfGuests: '',
  email: '',
};

interface propsFromDispatch {
  createNewReservation: (item: any) => any;
  updateReservation: (item: any) => any;
}

interface propsFromComponent {
  reservationId?: string;
}

type Props = propsFromDispatch & propsFromComponent;

const CreateAndEditReservation: React.FC<Props> = ({ createNewReservation, updateReservation, reservationId }) => {
  const [reservation, setReservation] = useState<Reservation>(initialReservationState);
  const [isUpdateMethod, setIsUpdateMethod] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrorsState>(initialFieldErrorsState);

  useEffect(() => {
    async function fetch() {
      if (reservationId !== undefined) {
        try {
          const result = await findReservationById(reservationId);
          result.dateAndTime = new Date(result.dateAndTime);
          setReservation(result);
          setIsUpdateMethod(true);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetch();
  }, []);

  const handleChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setReservation({ ...reservation, [e.currentTarget.id]: e.currentTarget.value });
    setFieldErrors({ ...fieldErrors, [e.currentTarget.id]: '' });
  };

  const handleChangeDateAndTime = (date: Date) => {
    validateDateAndTimeInput(date);
    setReservation({ ...reservation, dateAndTime: date });
  };

  const validateNameInput = () => {
    const { length } = reservation.name;
    if (length === 0) {
      setFieldErrors({ ...fieldErrors, name: 'Please enter your name.' });
      return;
    }
    if (length > 50) {
      setFieldErrors({ ...fieldErrors, name: 'Please enter a shorter name.' });
    }
  };

  const validateDateAndTimeInput = (date: Date) => {
    if (date === null) {
      setFieldErrors({ ...fieldErrors, dateAndTime: 'Please choose date and time.' });
      return;
    }
    if (date.getHours() < 12 || date.getHours() > 21 || (date.getHours() === 21 && date.getMinutes() !== 0)) {
      setFieldErrors({ ...fieldErrors, dateAndTime: 'Please choose time between 12:00 and 21:00.' });
      return;
    }
    setFieldErrors({ ...fieldErrors, dateAndTime: '' });
  };

  const validateNumberOfGuestsInput = () => {
    const numberOfGuestsValidator = /^[1-6]{1}$/;
    if (!numberOfGuestsValidator.test(reservation.numberOfGuests)) {
      setFieldErrors({ ...fieldErrors, numberOfGuests: 'Please enter a valid number between 1 to 6.' });
    }
  };

  const validateEmailInput = () => {
    const emailValidator =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reservation.email?.length !== 0 && !emailValidator.test(reservation.email!)) {
      setFieldErrors({ ...fieldErrors, email: 'Please enter a valid email.' });
    }
  };

  const addNewReservation = (e: React.FormEvent) => {
    e.preventDefault();
    createNewReservation(reservation);
    history.push('/');
  };

  const editReservation = (e: React.FormEvent) => {
    e.preventDefault();
    updateReservation(reservation);
    history.push('/');
  };

  return (
    <FormContainer>
      <FormCard interactive={false} elevation={Elevation.TWO}>
        <h1>{isUpdateMethod ? 'Edit' : 'Add new'} reservation</h1>
        <FormGroup label="Name" labelFor="text-input" labelInfo="(required)">
          <InputGroup
            id="name"
            placeholder="Name"
            value={reservation.name}
            onBlur={() => validateNameInput()}
            onChange={(e) => handleChangeData(e)}
          />
          <ErrorLabel>{fieldErrors.name}</ErrorLabel>
        </FormGroup>
        <FormGroup label="Date, time" labelFor="text-input" labelInfo="(required)">
          <DateInput
            {...getMomentFormatter('YYYY/M/D, HH:mm')}
            timePickerProps={{
              showArrowButtons: true,
              precision: 'minute',
              minTime: minHour(),
              maxTime: maxHour(),
            }}
            minDate={minHour()}
            value={reservation.dateAndTime}
            closeOnSelection={false}
            onChange={(e) => handleChangeDateAndTime(e)}
          />
          <ErrorLabel>{fieldErrors.dateAndTime}</ErrorLabel>
        </FormGroup>
        <FormGroup label="Number of guests" labelFor="text-input" labelInfo="(required)">
          <InputGroup
            id="numberOfGuests"
            placeholder="Number of guests"
            value={reservation.numberOfGuests}
            onBlur={() => validateNumberOfGuestsInput()}
            onChange={(e) => handleChangeData(e)}
          />
          <ErrorLabel>{fieldErrors.numberOfGuests}</ErrorLabel>
        </FormGroup>
        <FormGroup label="Email" labelFor="text-input" labelInfo="(optional)">
          <InputGroup
            id="email"
            placeholder="Email"
            value={reservation.email}
            onBlur={() => validateEmailInput()}
            onChange={(e) => handleChangeData(e)}
          />
          <ErrorLabel>{fieldErrors.email}</ErrorLabel>
        </FormGroup>
        <SubmitButton
          style={{ backgroundColor: '#f2c37e' }}
          isUpdateMethod
          disabled={
            fieldErrors.name !== '' ||
            fieldErrors.numberOfGuests !== '' ||
            fieldErrors.dateAndTime !== '' ||
            fieldErrors.email !== '' ||
            reservation.name === '' ||
            reservation.numberOfGuests === '' ||
            reservation.dateAndTime === null
          }
          onClick={(e) => {
            {
              isUpdateMethod ? editReservation(e) : addNewReservation(e);
            }
          }}
        >
          {isUpdateMethod ? 'Edit' : 'Add'}
        </SubmitButton>
      </FormCard>
    </FormContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    createNewReservation: (item: Reservation) => {
      dispatch(addNewReservation(item));
    },
    updateReservation: (item: Reservation) => {
      dispatch(editReservation(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAndEditReservation);

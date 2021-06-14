import { useState, useEffect, useReducer } from 'react';
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";


function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  function reducer(state, action) {
    const day = action.day;
    const days = action.days
    const appointments = action.appointments
    const interviewers = action.interviewers

    switch (action.type) {
      case 'SET_DAY':
        return ({
           ...state,
          day
        });
      case 'SET_APPLICATION_DATA':
        return ({
          ...state,
          days,
          appointments,
          interviewers
        })
      case 'SET_INTERVIEW':
        return ({
          ...state,
          days,
          appointments
        }) 
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const setDay = day => dispatch({ type: 'SET_DAY', day });

  // Render days, appts, and interviews on initial load
  useEffect(() => {
    const urlDays = `http://localhost:8001/api/days`;
    const urlAppointments = `http://localhost:8001/api/appointments`;
    const urlInterviews = `http://localhost:8001/api/interviewers`;

    const promise1 = axios.get(urlDays);
    const promise2 = axios.get(urlAppointments);
    const promise3 = axios.get(urlInterviews);
    
    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ]).then((all) => {
      dispatch({ 
        type: 'SET_APPLICATION_DATA',
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
      // dispatch({ type: "daysSetState", value: all[0].data });
      // dispatch({ type: "appointmentsSetState", value: all[1].data });
      // dispatch({ type: "interviewersSetState", value: all[2].data });
    });
  }, [])

  // Create/edit a new appointment using appointment id
  // with created interview obj from Appointment component
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = getSpotsForDay(state, id, appointments);

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(response => {
        dispatch({ type: 'SET_INTERVIEW', appointments, days});

        console.log("Interview created/edited!", response);
      });
  }

  // Delete an appointment using appointment id
  // Use interview obj (null) to set state
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = getSpotsForDay(state, id, appointments);

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        dispatch({ type: 'SET_INTERVIEW', appointments, days});

        
        console.log("Interview deleted!", response);
      });
  }

  return ({
    state,
    setDay,
    bookInterview,
    cancelInterview,
  });
}

export { useApplicationData };
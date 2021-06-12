import { useState, useEffect } from 'react';
import axios from "axios";

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Used in Application to render data for each day
  const setDay = day => setState({ ...state, day });

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
      setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
    });
  }, [])

  // Create/edit a new appointment using appointment id
  // With created interview obj from Appointment component
  function bookInterview(id, interview) {
    console.log("book", id, interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(response => {
        setState({
          ...state,
          appointments
        });
        console.log("Interview accepted!", response);
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments
        });
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
import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Render the correct spots remaining when appts are created/deleted
  const updateSpotsRemaining = (state, id, appointments) => {
    const days = [
      ...state.days,
    ];
  
    for (const index in state.days) {
      const found = state.days[index].appointments.find(appointment => appointment === id)

      if (found) {
        // Copy the day object that's found
        const dayObjCopy = {
          ...state.days[index]
        }

        // Count interviews in that dayObj that are null
        // Add to spotsRemaining for interviews that are null
        let spotsRemaining = 0;
        dayObjCopy.appointments.forEach(appt => {
          if (!appointments[appt].interview) {
            spotsRemaining++;
          }
        });
        
        // Update the spots for the dayObj, update days[index] to be returned
        // with the correct spots remaining
        dayObjCopy.spots = spotsRemaining;
        days[index] = dayObjCopy;
      }
    }
  
    return days;
  }
  
  const setDay = day => dispatch({ type: SET_DAY, day });

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
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
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
    
    const days = updateSpotsRemaining(state, id, appointments);

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments, days});
      });
  }

  // Delete an appointment using appointment id
  // Use interview obj (null) to set correct state
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpotsRemaining(state, id, appointments);

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments, days});
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
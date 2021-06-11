import React, { useState, useEffect } from "react";
import axios from "axios";

// Styling
import "components/Application.scss";

// Components
import DayList from "./DayList";
import Appointment from "./Appointment";

// Helpers
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  // Get data for interview scheduler on load
  // Days, appointments, and interviews
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

  // Creates a PUT request with the appointment id and the interview obj
  // If successful, sets and renders the state with the appointment obj
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

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
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

  // Loop through each appointment and display each day's appointment item
  // Get the interviewer specific to the interview
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          onChange={day => setDay(day)}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

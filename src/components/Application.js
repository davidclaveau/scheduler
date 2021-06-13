import React from "react";

// Styling
import "components/Application.scss";

// Components
import DayList from "./DayList";
import Appointment from "./Appointment";

// Custom Hooks
import { getAppointmentsForDay, getInterviewersForDay, getInterview, getSpotsForDay } from "helpers/selectors";
import { useApplicationData } from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
 
  const interviewers = getInterviewersForDay(state, state.day);
  
  // Loop through each appointment and display each day's appointment
  // Get the interviewer specific to the interview
  // Pass the functions for creating/editing/deleting interviews
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment 
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

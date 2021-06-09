import React, { useState, useEffect } from "react";

import "components/Application.scss";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    // API endpoints
    const urlDays = `http://localhost:8001/api/days`;
    const urlAppointments = `http://localhost:8001/api/appointments`;
    // const urlInterviews = `http://localhost:8001/api/interviewers`;

    // Promises
    const promise1 = axios.get(urlDays);
    const promise2 = axios.get(urlAppointments);
    // const promise3 = axios.get(urlInterviews);
    
    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
    ]).then((all) => {
      setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data 
        }));
    });
  }, [])

  const scheduledAppointments = dailyAppointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment}/>
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
        {scheduledAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

import React, { useState, useEffect } from "react";

import "components/Application.scss";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "David Claveau",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Caitlin Ing",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
      .then((response) => {
        console.log("response", [...response.data]);
        setDays([...response.data]);
      });
  }, [])

  const scheduledAppointments = appointments.map(appointment => {
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
          days={days}
          // day={days}
          onChange={day => setDays(day)}
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

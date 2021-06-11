import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";

import { useVisualMode } from '../../hooks/useVisualMode';
import Form from "./Form";


export default function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // Show to user that the action has registered
    transition(SAVING);
    
    // Await for Promise from bookInterview
    // Show input appointment if successful
    props.bookInterview(props.id, interview)
      .then(response => {
        transition(SHOW);
      })
      .catch(error => {
        console.log("There was an error in saving the appointment")
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          name={""}
          interviewer={null}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status />}
    </article>
  );
};
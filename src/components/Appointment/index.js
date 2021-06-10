import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import { useVisualMode } from '../../hooks/useVisualMode';
import Form from "./Form";

export default function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log("props", props.interview)
  console.log("mode", mode)
  // console.log("interview.student", props.interview.student);
  // console.log("interview.interviewer", props.interview.interviewer);

  // student={props.interview.student}
  // interviewer={props.interview.interviewer}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          name={""}
          interviewer={""}
          interviewers={[]}
          onSave={() => console.log("onSave")}
          onCancel={() => back()}
        />
      )}
    </article>
  );
};
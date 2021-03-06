import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from 'hooks/useVisualMode';
import Form from "./Form";


export default function Appointment(props) {
  // Set different modes to render based on state
  // Modes are controlled by useVisualMode
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
  // Takes the input for the student and the interviewer selected
  // Creates an interview object
  // Takes the current appointment (props.id) with interview object
  // to be used with bookInterview function to update state
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => {
        transition(ERROR_SAVE, true);
      });
  }

  // Replace interview object to null, to be used to update state
  // To be used with cancelInterview function to update state
  function destroy() {
    const interview = null;

    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
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
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={(name, interviewer) => save(name, interviewer)}
        onCancel={() => back()}
        />
      )}
      {mode === SAVING && 
        <Status 
          message={"Saving"}
        />
      }
      {mode === DELETING &&
        <Status 
          message={"Deleting"}
        />
      }
      {mode === CONFIRM && (
        <Confirm
          message={"Delete the appointment?"}
          onCancel={() => back()}
          onConfirm={() => destroy()}
        />
      )}
      {mode === ERROR_SAVE &&
        <Error 
          message={"Could not save appointment."}
          onClose={() => back()}
        />
      }
      {mode === ERROR_DELETE &&
        <Error 
          message={"Could not delete appointment."}
          onClose={() => back()}
        />
      }
    </article>
  );
}
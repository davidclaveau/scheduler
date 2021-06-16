const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  const day = action.day;
  const days = action.days
  const appointments = action.appointments
  const interviewers = action.interviewers

  switch (action.type) {
    case SET_DAY:
      return ({
         ...state,
        day
      });
    case SET_APPLICATION_DATA:
      return ({
        ...state,
        days,
        appointments,
        interviewers
      })
    case SET_INTERVIEW:
      return ({
        ...state,
        days,
        appointments
      }) 
    default:
      throw new Error(
        `Tried to reduce with unsupported type: ${action.type}`
      )
  }
};

export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
}

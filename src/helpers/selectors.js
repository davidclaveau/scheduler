const getAppointmentsForDay = (state, day) => {
  const appointmentsForDay = [];

  // Find appointments in state that match the day
  const dayAppointment = state.days.filter(element => element.name === day);
  
  // Find each appointment object in state and push to array
  // If no appointments, will return an empty array
  if (dayAppointment.length !== 0) {
    dayAppointment[0].appointments.forEach(appointment => {
      appointmentsForDay.push(state.appointments[appointment]);
    });
  }

  return appointmentsForDay;
};

const getInterviewersForDay = (state, day) => {
  const interviewersForDay = [];

  const dayAppointment = state.days.filter(element => element.name === day);

  if (dayAppointment.length !== 0) {
    dayAppointment[0].interviewers.forEach(interviewerId => {
      interviewersForDay.push(state.interviewers[interviewerId]);
    });
  }

  return interviewersForDay;
};

const getInterview = (state, interview) => {
  // If no interview is found, return null
  if (!interview) {
    return null;
  }

  // Get student string and interviewer object
  const student = interview.student;
  const interviewerData = state.interviewers[interview.interviewer];

  return {
    interviewer: interviewerData,
    student,
  }
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview }
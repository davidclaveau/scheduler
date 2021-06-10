const getAppointmentsForDay = (state, day) => {
  const appointmentsForDay = [];

  // Find appointments in state that match the day
  const dayAppointments = state.days.filter(element => element.name === day);
  
  // Find each appointment object in state and push to array
  // If no appointments, return an empty array
  if (dayAppointments.length !== 0) {
    dayAppointments[0].appointments.forEach(appointment => {
      appointmentsForDay.push(state.appointments[appointment]);
    });
  }

  return appointmentsForDay;
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

export {getAppointmentsForDay, getInterview}
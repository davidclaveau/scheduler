export default function getAppointmentsForDay(state, day) {
  // Find appointments in state that match the day
  const dayAppointments = state.days.filter(element => element.name === day);
  
  // If no appointments, return an empty array
  if (dayAppointments.length < 1) {
    return [];
  }

  // Get the appointment ids
  const appointmentIds = dayAppointments[0].appointments;

  // Find appointment objects in state and push to an array
  const appointmentsForDay = [];
  for (const id of appointmentIds) {
    appointmentsForDay.push(state.appointments[id]);
  }

  return appointmentsForDay;
};
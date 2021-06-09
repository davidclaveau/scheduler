export default function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];

  // Find appointments in state that match the day
  const dayAppointments = state.days.filter(element => element.name === day);
  
  // Find each appointment object in state and push to array
  // If no appointments, return an empty array
  if (dayAppointments.length !== 0) {
    dayAppointments[0].appointments.forEach(element => {
      appointmentsForDay.push(state.appointments[element]);
    });
  }

  return appointmentsForDay;
};
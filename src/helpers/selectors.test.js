import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [ 1, 2, 3, 4, 5 ],
      interviewers: [ 1, 2, 4, 7, 9 ],
      spots: 2
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [ 6, 7, 8, 9, 10 ],
      interviewers: [ 3, 4, 8, 9, 10 ],
      spots: 2
    },
  ],
  appointments: {
    1: {
      id: 1,
      time: "12pm",
      interview: {
        student: "Archie Cohen",
        interviewer: 4
      }
    },
    2: {
      id: 2,
      time: "1pm",
      interview: {
        student: "Chad Takahashi",
        interviewer: 9
      }
    },
    3: {
      id: 3,
      time: "2pm",
      interview: null
    },
    4: {
      id: 4,
      time: "3pm",
      interview: {
        student: "Jamal Jordan",
        interviewer: 9
      }
    },
    5: {
      id: 5,
      time: "4pm",
      interview: null
    },
    6: {
      id: 6,
      time: "12pm",
      interview: null
    },
    7: {
      id: 7,
      time: "1pm",
      interview: {
        student: "Leopold Silvers",
        interviewer: 8
      }
    },
    8: {
      id: 8,
      time: "2pm",
      interview: {
        student: "Liam Martinez",
        interviewer: 9
      }
    },
    9: {
      id: 9,
      time: "3pm",
      interview: null
    },
    10: {
      id: 10,
      time: "4pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: 3
      }
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    },
    5: {
      id: 5,
      name: "Sven Jones",
      avatar: "https://i.imgur.com/twYrpay.jpg"
    },
    6: {
      id: 6,
      name: "Susan Reynolds",
      avatar: "https://i.imgur.com/TdOAdde.jpg"
    },
    7: {
      id: 7,
      name: "Alec Quon",
      avatar: "https://i.imgur.com/3tVgsra.jpg"
    },
    8: {
      id: 8,
      name: "Viktor Jain",
      avatar: "https://i.imgur.com/iHq8K8Z.jpg"
    },
    9: {
      id: 9,
      name: "Lindsay Chu",
      avatar: "https://i.imgur.com/nPywAp1.jpg"
    },
    10: {
      id: 10,
      name: "Samantha Stanic",
      avatar: "https://i.imgur.com/okB9WKC.jpg"
    }
  }
};

// -------------------- Testing for getAppointmentsForDay -----------------------------
test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(5);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["6"]);
  expect(second).toEqual(state.appointments["7"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

// -------------------- Testing for getInterviewersForDay -----------------------------
test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(5);
});

test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
  const [first, second] = getInterviewersForDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers["3"]);
  expect(second).toEqual(state.interviewers["4"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});


// --------------------------- Testing for getInterview -----------------------------------
test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["1"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toBeNull();
});
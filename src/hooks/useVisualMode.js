import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  // Assign new mode from initial
  // Set history using previous values
  const transition = function(newMode, replace = false) {
    setHistory(prev => {
      setMode(newMode);
       
      // If replace is set as true, then we're replacing a value
      // in history with the newMode
      if (replace) {
        // Pop off the last one and replace with newMode
        prev.pop();
        const newHistoryArr = [...prev, newMode]
        return newHistoryArr;
      }

      const newHistoryArr = [...prev, newMode]
      return newHistoryArr;
    })
  }

  // Only go back if history isn't at initial
  // Create a copy and remove last value from history
  // Set newMode with the previous value in copy
  // Set history to new copy and set mode with newMode value
  const back = function() {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      const newMode = historyCopy[historyCopy.length - 1];
      setHistory(historyCopy)
      setMode(newMode);
    }
  }

  return ({
    mode,
    transition,
    back
  });
};


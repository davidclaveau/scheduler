import { useState } from 'react';

function useVisualMode(initial) {
  const [history, setHistory] = useState(initial);
  const [mode, setMode] = useState(initial);

  // Assign new mode from initial
  // Set history using previous value
  // Spread previous history if multiple values
  const transition = function(newMode, replace = false) {
    setHistory(prev => {
      setMode(newMode);
       
      // If replace is true, then we're replacing a value
      // in history with the newMode
      if (replace) {
        
        // If history has more than one value (array)
        // Pop off the last one and replace with newMode
        if (Array.isArray(prev)) { 
          prev.pop();
          const newHistoryArr = [...prev, newMode]
          return newHistoryArr;
        }

        const newHistory = [newMode]
        return newHistory;
      }

      if (Array.isArray(prev)) {
        const newHistoryArr = [...prev, newMode]
        return newHistoryArr;
      }
      
      const newHistory = [prev, newMode]
      return newHistory;
    })
  }

  // Create a copy and remove last value from history
  // Set newMode with the previous value in copy
  // Set history to new copy and set mode with newMode value
  // Only permit if history is greater than 1 value (array)
  const back = function() {
    if (Array.isArray(history)) {
      const copy = [...history];
      copy.pop();
      const newMode = copy[copy.length - 1];
      setHistory(copy)
      setMode(newMode);
    }
  }

  return ({
    mode,
    transition,
    back
  });
};

export { useVisualMode };


// Detection Results Context
import { createContext, useState } from 'react';

export const DetectionContext = createContext();

export const DetectionProvider = ({ children }) => {
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([]);

  const addResult = (result) => {
    setLastResult(result);
    setHistory([result, ...history]);
  };

  const clearHistory = () => {
    setHistory([]);
    setLastResult(null);
  };

  return (
    <DetectionContext.Provider value={{ lastResult, history, addResult, clearHistory }}>
      {children}
    </DetectionContext.Provider>
  );
};

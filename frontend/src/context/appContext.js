import {
  createContext,
  useContext,
  useState,
} from 'react';

// context created to manage difficulty state
export const AppContext = createContext({
  difficultyLevel: "easy",
  setDifficultyLevel: () => {},
});

export const AppProvider = ({ children }) => {
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  return (
    <AppContext.Provider
      value={{
        difficultyLevel,
        setDifficultyLevel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

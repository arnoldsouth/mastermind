import './App.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import Game from './components/Game';
import Home from './components/Home';
import { AppProvider } from './context/appContext';

function App() {
  return (
    // created context for the application and wrapped everything inside the Provider
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </AppProvider>
  );
}

export default App;

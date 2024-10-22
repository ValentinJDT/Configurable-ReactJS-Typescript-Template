import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import './i18n';
import { Config, ConfigContext, EMPTY_CONFIG, loadConfig } from './contexts/ConfigContext';
import { useEffect, useState } from 'react';
import DashboardSize from './pages/DashboardSize';
import Tables from './pages/Tables';

function App() {
  const [config, setConfig] = useState<Config>(EMPTY_CONFIG);

  useEffect(() => {
    loadConfig((data) => setConfig(data));
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<DashboardSize />} />
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </BrowserRouter>
    </ConfigContext.Provider>
  );
}

export default App;

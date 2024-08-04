import { StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { authenticator } from './lib';
import { BootPage, LoginPage, RootPage } from './pages';

type View = 'BOOT' | 'LOGIN' | 'ROOT';

export function App() {
  const [view, setView] = useState<View>('BOOT');

  const handleBooted = () => {
    const isAuthenticated = authenticator.isAuthenticated();

    if (isAuthenticated) {
      setView('ROOT');
      return;
    }

    setView('LOGIN');
  };

  const handleLoggedIn = () => {
    setView('ROOT');
  };

  const renderBOOT = () => <BootPage onBooted={handleBooted} />;

  const renderLOGIN = () => <LoginPage onLoggedIn={handleLoggedIn} />;

  const renderROOT = () => <RootPage />;

  const renders: Record<View, () => JSX.Element> = {
    BOOT: renderBOOT,
    LOGIN: renderLOGIN,
    ROOT: renderROOT,
  };

  return renders[view]();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

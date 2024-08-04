import { useState } from 'react';
import { BootPage, LoginPage, RootPage } from '../pages';
import { authenticator, streamer } from '../lib';

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

export default App;

import { useEffect } from 'react';
import { authenticator } from '../../lib';

interface BootPageProps {
  onBooted: () => void;
}

export function BootPage(props: BootPageProps) {
  const handleBoot = async () => {
    await Promise.all([
      authenticator.boot(),
      // other
    ]);
    props.onBooted();
  };

  useEffect(() => {
    handleBoot();
  }, []);

  return null;
}

export default BootPage;

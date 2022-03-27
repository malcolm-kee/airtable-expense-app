import * as React from 'react';

const OfflineContext = React.createContext(false);
OfflineContext.displayName = 'OfflineContext';

export const OfflineContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [offline, setOffline] = React.useState(false);

  React.useEffect(() => {
    setOffline(!navigator.onLine);

    function onOnline() {
      setOffline(false);
    }

    function onOffline() {
      setOffline(true);
    }

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  });

  return (
    <OfflineContext.Provider value={offline}>
      {props.children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => React.useContext(OfflineContext);

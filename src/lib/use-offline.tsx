import * as React from 'react';

const OfflineContext = React.createContext(false);
OfflineContext.displayName = 'OfflineContext';

function subscribeOnlineStatus(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export const OfflineContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const isOnline = React.useSyncExternalStore(
    subscribeOnlineStatus,
    () => navigator.onLine,
    () => true
  );

  return (
    <OfflineContext.Provider value={!isOnline}>
      {props.children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => React.useContext(OfflineContext);

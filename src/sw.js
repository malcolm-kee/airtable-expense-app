import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const bgSyncPlugin = new BackgroundSyncPlugin('expenseQueue', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  /\/\.netlify\/functions\/*/,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

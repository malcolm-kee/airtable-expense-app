import { OfflineContextProvider } from '~/lib/use-offline';
import { ExpenseForm } from './modules/expense';
import { UpdatePrompt } from './modules/pwa';

function App() {
  return (
    <OfflineContextProvider>
      <ExpenseForm />
      <UpdatePrompt />
    </OfflineContextProvider>
  );
}

export default App;

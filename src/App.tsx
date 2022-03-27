import './App.css';
import { ExpenseForm } from './modules/expense';
import { UpdatePrompt } from './modules/pwa';

function App() {
  return (
    <div className="App">
      <ExpenseForm />
      <UpdatePrompt />
    </div>
  );
}

export default App;

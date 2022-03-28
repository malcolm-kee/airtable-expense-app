import * as React from 'react';
import { SelectField } from '~/components/select-field';
import { TextField } from '~/components/text-field';
import { TextareaField } from '~/components/textarea-field';
import { useOffline } from '~/lib/use-offline';
import { addExpense } from '../api';

export const ExpenseForm = () => {
  const [date, setDate] = React.useState(getToday);
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('Food');
  const [remarks, setRemarks] = React.useState('');

  const amountInputRef = React.useRef<HTMLInputElement>(null);

  const isOffline = useOffline();

  const reset = () => {
    setDate(getToday());
    setAmount('');
    setCategory('Food');
    setRemarks('');

    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        addExpense({
          Date: date,
          Amount: Number(amount),
          Category: category,
          Remarks: remarks,
        })
          .then(reset)
          .catch((err) => {
            if (isOffline) {
              reset();
            } else {
              console.error(err);
              alert(String(err));
            }
          });
      }}
      className="max-w-md mx-auto p-6 space-y-6"
    >
      <TextField
        label="Date"
        value={date}
        onChangeValue={setDate}
        type="date"
        id="date"
        required
      />
      <TextField
        label="Amount"
        value={amount}
        onChangeValue={setAmount}
        type="number"
        id="amount"
        required
        autoFocus
        ref={amountInputRef}
      />
      <SelectField
        label="Category"
        value={category}
        onChangeValue={setCategory}
        id="category"
        required
      >
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Transportation">Transportation</option>
        <option value="Accommodation">Accommodation</option>
        <option value="Learning">Learning</option>
        <option value="Love">Love</option>
        <option value="Family">Family</option>
        <option value="Health">Health</option>
        <option value="Pet">Pet</option>
      </SelectField>
      <TextareaField
        label="Remarks"
        value={remarks}
        onChangeValue={setRemarks}
        id="remarks"
      />
      <div>
        <button
          type="submit"
          className="w-full items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          ADD
        </button>
      </div>
    </form>
  );
};

const getToday = () => new Date().toISOString().slice(0, 10);

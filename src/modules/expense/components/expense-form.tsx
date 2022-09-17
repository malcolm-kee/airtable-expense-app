import * as React from 'react';
import { SelectField } from '~/components/select-field';
import { TextField } from '~/components/text-field';
import { TextareaField } from '~/components/textarea-field';
import { CheckboxField } from '~/components/checkbox-field';
import { useOffline } from '~/lib/use-offline';
import { cx } from '~/lib/cx';
import { addExpense } from '../api';

export const ExpenseForm = () => {
  const [date, setDate] = React.useState(getToday);
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('Food');
  const [remarks, setRemarks] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'busy'>('idle');
  const [recurring, setRecurring] = React.useState(false);

  const amountInputRef = React.useRef<HTMLInputElement>(null);

  const isOffline = useOffline();

  const reset = () => {
    setDate(getToday());
    setAmount('');
    setCategory('Food');
    setRemarks('');
    setStatus('idle');

    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        setStatus('busy');
        addExpense({
          Date: date,
          AUD: Number(amount),
          Category: category,
          Remarks: remarks,
          Recurring: recurring,
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
        disabled={status === 'busy'}
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
        disabled={status === 'busy'}
      />
      <SelectField
        label="Category"
        value={category}
        onChangeValue={setCategory}
        id="category"
        required
        disabled={status === 'busy'}
      >
        <option value="Food">Food</option>
        <option value="Accommodations">Accommodations</option>
        <option value="Hygiene">Hygiene</option>
        <option value="Social">Social</option>
        <option value="Love">Love</option>
        <option value="Transportation">Transportation</option>
        <option value="Comms and Internet">Comms and Internet</option>
      </SelectField>
      <CheckboxField
        label="Recurring"
        checked={recurring}
        onChangeValue={setRecurring}
        id="recurring"
        name="recurring"
      />
      <TextareaField
        label="Remarks"
        value={remarks}
        onChangeValue={setRemarks}
        id="remarks"
        disabled={status === 'busy'}
      />
      <div>
        <button
          type="submit"
          className={cx(
            'w-full items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500',
            status === 'busy' ? 'bg-pink-400' : 'bg-pink-600 hover:bg-pink-700'
          )}
          disabled={status === 'busy'}
        >
          {status === 'busy' ? 'ADDING...' : 'ADD'}
        </button>
      </div>
    </form>
  );
};

const getToday = () => new Date().toISOString().slice(0, 10);

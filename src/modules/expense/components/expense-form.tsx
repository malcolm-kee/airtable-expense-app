import * as React from 'react';
import { addExpense } from '../api';

export const ExpenseForm = () => {
  const [date, setDate] = React.useState(getToday);
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [remarks, setRemarks] = React.useState('');

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        addExpense({
          Date: date,
          Amount: Number(amount),
          Category: category,
          Remarks: remarks,
        }).then(() => {
          setDate(getToday());
          setAmount('');
          setCategory('');
          setRemarks('');
        });
      }}
    >
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(ev) => setAmount(ev.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Learning">Learning</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Family">Family</option>
          <option value="Love">Love</option>
        </select>
      </div>
      <div>
        <label htmlFor="remarks">Remarks</label>
        <textarea
          id="remarks"
          value={remarks}
          onChange={(ev) => setRemarks(ev.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">ADD</button>
      </div>
    </form>
  );
};

const getToday = () => new Date().toISOString().slice(0, 10);

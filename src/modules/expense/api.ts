import type { Expense } from './type';

export const addExpense = (data: Expense) =>
  fetch('/.netlify/functions/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

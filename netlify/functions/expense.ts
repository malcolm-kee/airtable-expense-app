import { Handler } from '@netlify/functions';
import Airtable from 'airtable';

const base = Airtable.base(process.env.AIRTABLE_BASE);

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'POST') {
    await base('Expenses').create([
      {
        fields: JSON.parse(event.body),
      },
    ]);

    return {
      statusCode: 200,
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Unsupported method' }),
  };
};

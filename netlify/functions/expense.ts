import { Handler } from '@netlify/functions';
import Airtable from 'airtable';

const base = Airtable.base(process.env.AIRTABLE_BASE!);

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body!);

    try {
      await base('Expenses').create([
        {
          fields: data,
        },
      ]);

      return {
        statusCode: 200,
      };
    } catch (err) {
      console.error(err);

      return {
        statusCode: 500,
        error: err,
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Unsupported method' }),
  };
};

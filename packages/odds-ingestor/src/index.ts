import { ingestOdds } from './ingestOdds.js';
import 'dotenv/config';
export { ingestOdds } from './ingestOdds.js';

async function test() {
  try {
    const data = await ingestOdds();
    
    console.log('Raw API data received:');
    // console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('API call failed:', err);
  }
}

test();
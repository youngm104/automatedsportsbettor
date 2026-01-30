import axios from 'axios';
import { CONFIG } from './config.js';

export async function fetchOdds(): Promise<any> {
    try {
        const response = await axios.get(`${CONFIG.baseUrl}/sports/basketball_nba/odds`, { //basketball_nba
            params: {
                apiKey: CONFIG.apiKey,
                regions: 'au',
                markets: 'h2h',
                oddsFormat: 'decimal',
                dateFormat: 'iso',
            },
            timeout: 5000,
        })
        console.log('Remaining requests', response.headers['x-requests-remaining']);
        console.log('Used requests', response.headers['x-requests-used']);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (err: any) {
        console.error('Error fetching odds:', err.response?.data);
        throw err;
    }
}
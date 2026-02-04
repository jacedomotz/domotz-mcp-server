import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.DOMOTZ_API_KEY;
const API_BASE_URL = process.env.DOMOTZ_API_BASE_URL || 'https://api-us-east-1-cell-1.domotz.com/public-api/v1';

if (!API_KEY) {
  console.error('ERROR: DOMOTZ_API_KEY environment variable is required');
  process.exit(1);
}

export const domotzApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

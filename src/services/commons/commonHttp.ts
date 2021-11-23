import axios from 'axios';

import { config } from 'environment';

const httpCommon = axios.create({
  baseURL: config.url.AUTH_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

export const SetCommonToken = (token: string | null) => {
  httpCommon.defaults.headers.Authorization = token;
};

export default httpCommon;

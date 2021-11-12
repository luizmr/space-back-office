const prod = {
  ACCOUNT_URL: 'https://accounts-api.eduzz.com',
  ACCOUNT_PARTNER: '931a2f6e-5574-4900-ad74-d3117fc4281b',
  ACCOUNT_ENV: 'production'
};

const dev = {
  ACCOUNT_URL: 'https://accounts-api.qa.devzz.ninja',
  ACCOUNT_PARTNER: '01ace942-7c38-4f3d-95c1-d16d15370256',
  ACCOUNT_ENV: 'homolog'
};

export const config = process.env.REACT_APP_API_ENV === 'production' ? prod : dev;

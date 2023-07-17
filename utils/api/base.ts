let API_BASE_URL_DEV = 'https://localhost:7014';
let API_BASE_URL_PROD = 'https://wardsapi.azurewebsites.net';

// API_BASE_URL_DEV = API_BASE_URL_PROD; // dev = prod;

export default process.env.NODE_ENV === 'development' ? API_BASE_URL_DEV : API_BASE_URL_PROD;
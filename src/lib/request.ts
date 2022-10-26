import Axios, { AxiosRequestConfig } from 'axios';
const baseURL = process.env.REACT_APP_API_URL;
export type RefreshTokenResponse = {
  refresh_token: string;
  access_token: string;
};

function authRequestInterceptor(config: AxiosRequestConfig) {
  const _token = localStorage.getItem('user-token');

  // Fix stupid axios typescript
  if (_token && config.headers) {
    config.headers.authorization = `Bearer ${_token}`;
  }

  return config;
}

export const request = Axios.create({
  baseURL,
});

request.interceptors.request.use(authRequestInterceptor);
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message
    // Handle toast message

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user-token');
      window.location.href = '/'
    }
    if (error.response) {
      error.response.data.httpStatus = error.response.status;
    }
    return Promise.reject(error.response.data);
  }
);

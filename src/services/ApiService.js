import axios from "axios";

axios.defaults.baseURL = 'https://short-game-guru-28855.herokuapp.com';
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.timeout = 10000;
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

const post = (url, body = {}) => axios.post(url, body);
const get = (url, params = {}) => axios.get(url, { params });
const put = (url, body = {}) => axios.put(url, body);
const patch = (url, body = {}) => axios.patch(url, body);
const del = (url, params = {}) => axios.delete(url, { params });

const ApiService = {
  axios,
  setAuthHeader: (token) => {
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
  },
  removeAuthHeader: () => {
    delete axios.defaults.headers.common["Authorization"];
  },

  login: (params) => post(`/rest-auth/login/`, params),  
  signup: (params) => post(`/rest-auth/registration/`, params),
  verifyEmail: (params) => post(`/rest-auth/registration/verify-email/`, params),
  forgetPassSend: (params) => post(`/rest-auth/password/reset/`, params),
  forgetPassResend: (params) => post(`/users/reset-password/resend/`, params),
  forgetPassVerify: (params) => post(`/rest-auth/password/reset/confirm/`, params),
  changePassword: (params) => post(`/rest-auth/password/change/`, params),
  getUser: () => get(`/rest-auth/user/`),
  
  getProfile: () => get(`/users/profile/`),
  updateProfile: (id, params) => patch(`/api/v1/profile/${id}/`, params),

  postFeedback: (params) => post(`/feedback/`, params),
};

export default ApiService;

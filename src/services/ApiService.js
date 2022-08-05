import axios from "axios";

axios.defaults.baseURL = 'https://student-housing-app-23717.botics.co';
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

  login: (params) => post(`/api/v1/login/`, params),  
  signup: (params) => post(`/api/v1/signup/`, params),
  verifyOtp: (params) => post(`/api/v1/verify-user/`, params),
  resendOtp: (params) => post(`/api/v1/resend-otp/`, params),
  forgetPassSend: (params) => post(`/rest-auth/password/reset/`, params),
  changePassword: (params) => post(`/api/v1/user/change-password/`, params),
  updateEmail: (params) => post(`/api/v1/user/change-email/`, params),
  updatePhoneNUMber: (params) => post(`/api/v1/user/update-phone-number/`, params),
  getUser: () => get(`/me/`),
  
  getProfile: () => get(`/api/v1/profile/`),
  insertProfile: (params) => post(`/api/v1/profile/`, params),
  updateProfile: (id, params) => patch(`/api/v1/profile/${id}/`, params),
  getReviews: () => get(`/api/v1/user-rating/`),

  postFeedback: (params) => post(`/feedback/`, params),
  
  getProperty: () => get(`/api/v1/property/`),
  getWishlist: () => get(`/api/v1/property/?is_wish_listed=True`),
  updateWishlist: (params) => post(`/api/v1/property-wishlist/`, params),
  bookProperty: (params) => post(`/api/v1/book-property/`, params),

};

export default ApiService;

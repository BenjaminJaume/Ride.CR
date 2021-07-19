import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

const register = (username, email, password) => {
  return axios.post(URL_API + "/auth/signup", {
    username,
    email,
    password,
  });
};

const login = (credential, password) => {
  return axios
    .post(URL_API + "/auth/signin", {
      credential,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const signupUser = (formSignupUser) => {
  return axios.post(URL_API + "/signup/signupUser", {
    formSignupUser,
  });
};

const exported = {
  register,
  signupUser,
  login,
  logout,
};

export default exported;

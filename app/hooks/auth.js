import axios from "axios";

const key = "AIzaSyD_ylVOIox93V4TtC5iHsi2x_Q7V6wRM18";

export const AuthSignup = async ({ email, password }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return response.data;
};

export const AuthLogin = async ({ email, password }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return response.data;
};

export const resetPassword = async ({ email }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
    {
      email,
      requestType: "PASSWORD_RESET",
    }
  );

  return response.data;
};

export const exchangeToken = async (refreshToken) => {
  const response = await axios.post(
    `https://securetoken.googleapis.com/v1/token?key=${key}`,
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }
  );

  return response.data;
};

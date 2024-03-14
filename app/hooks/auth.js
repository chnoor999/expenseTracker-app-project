import axios from "axios";

const key = "AIzaSyD_ylVOIox93V4TtC5iHsi2x_Q7V6wRM18";

export const AuthSignup = async ({ email, password }) => {
  const respoense = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return respoense.data;
};

export const Authlogin = async ({ email, password }) => {
  const respoense = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return respoense.data;
};
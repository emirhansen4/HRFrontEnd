import axios from "axios";

export const sendMail = async (email, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.post(
      `https://localhost:7048/api/Account/SendCode`,
      {
        email,
      }
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }
  callback(message, badResponse);
};

export const sendCode = async (datas, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.post(
      `https://localhost:7048/api/Account/ConfirmCode`,
      datas
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }
  callback(message, badResponse);
};

export const refreshPassword = async (passwords, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.put(
      `https://localhost:7048/api/Account/ChangePassword`,
      passwords
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }
  callback(message, badResponse);
};

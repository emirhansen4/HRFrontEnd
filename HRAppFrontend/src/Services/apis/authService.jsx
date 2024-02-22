import axios from "axios";
import { getlogo } from "../../Redux/features/logoGetReducer";

export const authLogin = async (email, password, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.post(
      `https://localhost:7048/api/Account/Login`,
      {
        email,
        password,
      }
    );
    if (response.data) {
      localStorage.setItem("jwt", JSON.stringify(response.data));
      localStorage.setItem("auth", JSON.stringify("true"));
      message = "Giriş Başarılı";
    } else {
      badResponse = "Giriş yaparken hata oluştu";
    }
  } catch (error) {
    localStorage.setItem("auth", JSON.stringify(false));
    const errorResponse = error.response ? error.response.data : null;
    badResponse = errorResponse;
  }
  callback(message, badResponse);
};

export const getLogo = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      'https://localhost:7048/api/Employee/GetCompanyLogo'
    );
    dispatch(getlogo(data));
  } catch (error) {
    console.error('Error fetching logo:', error);
  }
};

export const logOut = () => {
  localStorage.setItem("auth", JSON.stringify(false));
  localStorage.removeItem("jwt");
};

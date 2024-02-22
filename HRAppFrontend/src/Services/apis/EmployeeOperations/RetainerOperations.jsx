import axios from "axios";
import {
  getRetainerFailure,
  getRetainerStart,
  getRetainerSuccess,
} from "../../../Redux/features/retainerGetReducer";

export const sendRetainer = async (datas, callback) => {
  let message = null;
  let badResponse = null;

  try {
    const response = await axios.post(
      `https://localhost:7048/api/AdvancePayment/CreateAdvancePayment`,
      datas
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }

  callback(message, badResponse);
};

export const changeRetainer = async (datas, id, callback) => {
  let message = null;
  let badResponse = null;

  try {
    const response = await axios.put(
      `https://localhost:7048/api/AdvancePayment/UpdateAdvancePayment?advanceId=${id}`,
      datas
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }

  callback(message, badResponse);
};

export const deleteRetainer = async (id, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.delete(
      `https://localhost:7048/api/AdvancePayment/DeleteAdvancePayment?advanceId=${id}`
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }

  callback(message, badResponse);
};

export const getRetainer = () => async (dispatch) => {
  dispatch(getRetainerStart());
  try {
    const { data } = await axios.get(
      `https://localhost:7048/api/AdvancePayment/GetAdvancePayments`
    );
    dispatch(getRetainerSuccess(data));
  } catch (error) {
    dispatch(getRetainerFailure(error.message));
  }
};

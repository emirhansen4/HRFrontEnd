import axios from "axios";
import { getLeaveFailure, getLeaveStart, getLeaveSuccess } from "../../../Redux/features/leaveGetReducer";

export const sendLeave = async (datas, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.post(
      `https://localhost:7048/api/Leave/CreateLeave`,
      datas
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }

  callback(message, badResponse);
};


export const changeLeave = async (datas, id, callback) => {
    let message = null;
    let badResponse = null;
  
    try {
      const response = await axios.put(
        `https://localhost:7048/api/Leave/UpdateLeave?leaveId=${id}`,
        datas
      );
      message = response.data;
    } catch (error) {
      badResponse = error.message;
    }
  
    callback(message, badResponse);
  };
  
  export const deleteLeave = async (id, callback) => {
    let message = null;
    let badResponse = null;
    try {
      const response = await axios.delete(
        `https://localhost:7048/api/Leave/DeleteLeave?leaveId=${id}`
      );
      message = response.data;
    } catch (error) {
      badResponse = error.message;
    }
  
    callback(message, badResponse);
  };
  
  export const getLeave = () => async (dispatch) => {
    dispatch(getLeaveStart());
    try {
      const { data } = await axios.get(
        `https://localhost:7048/api/Leave/GetLeaves`
      );
      dispatch(getLeaveSuccess(data));
    } catch (error) {
      dispatch(getLeaveFailure(error.message));
    }
  };
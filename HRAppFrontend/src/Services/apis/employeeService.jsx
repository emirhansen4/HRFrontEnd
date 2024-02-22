import axios from "axios";
import {
  getFailure,
  getStart,
  getSuccess,
} from "../../Redux/features/employeesReducer";

import {
  getJobsStart,
  getJobsSuccess,
  getJobsFailure
} from "../../Redux/features/jobsGetReducer";
import { getUpdateDetailFailure, getUpdateDetailStart, getUpdateDetailSuccess } from "../../Redux/features/employeeUpdateDetail";
import { getDetailFailure, getDetailStart, getDetailSuccess } from "../../Redux/features/employeeDetailReducer";

export const getEmployees = () => async (dispatch) => {
  dispatch(getStart());
  try {
    const { data } = await axios.get(
      `https://localhost:7048/api/Admin/GetAllEmployees`
    );
    dispatch(getSuccess(data));
  } catch (error) {
    dispatch(getFailure(error.message));
  }
};

export const getEmployeeDetail = (id) => async (dispatch) => {
  dispatch(getDetailStart());
  try {
    const { data } = await axios.get(
      `https://localhost:7048/api/Admin/GetDetails?appUserId=${id}`
    );
    dispatch(getDetailSuccess(data));
  } catch (error) {
    dispatch(getDetailFailure(error.message));
  }
};

export const getEmployeeUpdateDetail = (id) => async (dispatch) => {
  dispatch(getUpdateDetailStart());
  try {
    const { data } = await axios.get(
      `https://localhost:7048/api/Admin/GetUserUpdateDetails?appUserId=${id}`
    );
    dispatch(getUpdateDetailSuccess(data));
  } catch (error) {
    dispatch(getUpdateDetailFailure(error.message));
  }
};

export const editEmployee = async (id, datas, callback) => {
  let message= null;
  let badResponse = null;
  try {
    const response = await axios.put(
      `https://localhost:7048/api/Admin/UpdateEmployee?id=${id}`,
      datas,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    message = response.data;
  } catch (error) {
    badResponse = error.message;
  }
  callback(message, badResponse);
};

export const getJobs = () => async (dispatch) => {
  dispatch(getJobsStart());
  try {
    const { data } = await axios.get(
      `https://localhost:7048/api/Admin/GetDepartmentsAndProfessions`
    );
    dispatch(getJobsSuccess(data));
  } catch (error) {
    dispatch(getJobsFailure(error.message));
  }
};

export const addEmployee = async (datas, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.post(
      `https://localhost:7048/api/Admin/AddEmployee`,
      datas,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    message = response.data;
  } catch (error) {
    if(error.response && error.response.data)
      badResponse = error.response.data;
    else
      badResponse = error.message;
  }
  callback(message,badResponse);
};

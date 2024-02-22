import axios from "axios";
import {
  getCompaniesFailure,
  getCompaniesStart,
  getCompaniesSuccess,
} from "../../Redux/features/companiesListReducer";
import { getCompanyDetailFailure, getCompanyDetailStart, getCompanyDetailSuccess } from "../../Redux/features/companyDetailGetReducer";

export const companyAdd = async (admindata, companyData, callback) => {
  let message = null;
  let badResponse = null;
  const formData = new FormData();
  formData.append("companyLogo", companyData.logo);
  formData.append("companyName", companyData.name);
  formData.append("companyDescription", companyData.description);
  formData.append("subscriptionStart", companyData.subscriptionStart);
  formData.append("subscriptionEnd", companyData.subscriptionEnd);
  formData.append("CompanyAddress", companyData.adress);
  formData.append("companyPhone", companyData.phone);
  formData.append("adminEmail", admindata.email);
  formData.append("adminPassword", admindata.password);
  formData.append("adminFirstName", admindata.name);
  formData.append("adminLastName", admindata.lastName);
  formData.append("adminMiddleName", admindata.secondName);
  formData.append("adminSecondLastName", admindata.secondLastName);
  formData.append("adminTRIdentityNumber", admindata.TC);
  formData.append("adminBirthDate", admindata.birthDate);
  formData.append("adminPlaceOfBirth", admindata.placeOfBirth);
  try {
    const response = await axios.post(
      `https://localhost:7048/api/Company/CreateCompany/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    message = response.data;
  } catch (error) {
    if (error.response && error.response.data)
      badResponse = error.response.data;
    else badResponse = error.message;
  }
  callback(message, badResponse);
};

export const companiesGet = () => async (dispatch) => {
  dispatch(getCompaniesStart());
  try {
    const { data } = await axios.get(
      `https://localhost:7048/api/Company/GetCompanys`
    );
    dispatch(getCompaniesSuccess(data));
  } catch (error) {
    dispatch(getCompaniesFailure(error.message));
  }
};

export const companyDelete = async (id, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.delete(
      `https://localhost:7048/api/Company/DeleteCompany?companyId=${id}`
    );
    message = response.data;
  } catch (error) {
    if (error.response && error.response.data)
      badResponse = error.response.data;
    else badResponse = error.message;
  }
  callback(message, badResponse);
};

export const stopSubscription = async (id, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.put(
      `https://localhost:7048/api/Company/StopSubscription?companyId=${id}`
    );
    message = response.data;
  } catch (error) {
    if (error.response && error.response.data)
      badResponse = error.response.data;
    else badResponse = error.message;
  }
  callback(message, badResponse);
};

export const extendSubscription = async (data, callback) => {
  let message = null;
  let badResponse = null;
  try {
    const response = await axios.put(
      `https://localhost:7048/api/Company/ExtendSubscription`,
      data
    );
    message = response.data;
  } catch (error) {
    if (error.response && error.response.data)
      badResponse = error.response.data;
    else badResponse = error.message;
  }
  callback(message, badResponse);
};

export const companiesDetailGet = (id) => async (dispatch) => {
  dispatch(getCompanyDetailStart());
  try {
    const { data } = await axios.get(
      `https://localhost:7048/api/Company/GetCompanyUpdateDetails?companyId=${id}`
    );
    dispatch(getCompanyDetailSuccess(data));
  } catch (error) {
    dispatch(getCompanyDetailFailure(error.message));
  }
};


export const companyUpdate = async (id, data, callback) => {
  let message = null;
  let badResponse = null;
  const formData = new FormData();
  formData.append("CompanyLogo", data.logo);
  formData.append("CompanyName", data.name);
  formData.append("SubscriptionEndDate", data.subscriptionEnd);
  formData.append("SubscriptionStartDate", data.subscriptionStart);
  formData.append("CompanyAddress", data.address);
  formData.append("CompanyPhone", data.phone);
  formData.append("CompanyDescription", data.description);
  try {
    const response = await axios.put(
      `https://localhost:7048/api/Company/UpdateCompany?companyId=${id}`,
      formData,
      {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }
    );
    message = response.data;
  } catch (error) {
    if (error.response && error.response.data)
      badResponse = error.response.data;
    else badResponse = error.message;
  }
  callback(message, badResponse);
};
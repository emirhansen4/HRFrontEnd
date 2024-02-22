import { configureStore, combineReducers } from '@reduxjs/toolkit'
import getSliceReducer from '../features/commonGetFeature.jsx'
import { AuthReducer } from '../Reducers/AuthReducer.jsx';
import { employeesSlicer } from '../features/employeesReducer.jsx';
import { employeeDetailSlicer } from '../features/employeeDetailReducer.jsx';
import { locationsSlicer } from '../features/locationsReducer.jsx';
import { JobSlicer } from '../features/jobsGetReducer.jsx';
import CheckboxReducer from '../Reducers/darkModeSwitchReducer.jsx';
import { employeeUpdateDetailSlice } from '../features/employeeUpdateDetail.jsx';
import  { profileUpdateDetailSlice } from '../features/profileUpdateDetailReducer.jsx';
import { retainerSlice } from '../features/retainerGetReducer.jsx';
import { requestGetSlice } from '../features/requestsGetReducer.jsx';
import ThemaReducer from '../Reducers/roleThemaReducer.jsx';
import { companiesGetSlice } from '../features/companiesListReducer.jsx';
import { companyDetailGetSlice } from '../features/companyDetailGetReducer.jsx';
import { leaveSlice } from '../features/leaveGetReducer.jsx';
import { logoSlice } from '../features/logoGetReducer.jsx';


const rootReducer = combineReducers({
  details: getSliceReducer,
  auth: AuthReducer,
  summary: getSliceReducer,
  employees: employeesSlicer.reducer,
  locations: locationsSlicer.reducer,
  employeeDetail: employeeDetailSlicer.reducer,
  jobs : JobSlicer.reducer,
  employeeUpdateDetail: employeeUpdateDetailSlice.reducer,
  profileUpdateDetail: profileUpdateDetailSlice.reducer,
  retainer: retainerSlice.reducer,
  leave: leaveSlice.reducer,
  requests: requestGetSlice.reducer,
  darkMode: CheckboxReducer,
  thema: ThemaReducer,
  companies: companiesGetSlice.reducer,
  companyDetail: companyDetailGetSlice.reducer,
  logo: logoSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});

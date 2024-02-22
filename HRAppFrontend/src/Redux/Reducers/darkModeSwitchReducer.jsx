
export const setCheckboxValue = (value) => ({
  type: 'SET_VALUE',
  payload: value,
});

const initialState = false;

const CheckboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      return action.payload;
    default:
      return state;
  }
};

export default CheckboxReducer;
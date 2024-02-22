import { decode } from "../../Services/JwtDecoder";

export const setThema = (value) => ({
  type: 'CHANGE_VALUE',
  payload: value,
});

const initialState = decode().currentRole? decode().currentRole: "User";

const ThemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return action.payload;
    default:
      return state;
  }
};

export default ThemaReducer;
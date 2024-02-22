import axios from "axios";
import { getLocationFailure, getLocationStart, getLocationSuccess } from "../../Redux/features/locationsReducer";

export const location = () => async (dispatch)=>{
    dispatch(getLocationStart());
    try {
        const { data } = await axios.get(`https://raw.githubusercontent.com/molcay/TR-il-ilce-listesi/master/il-ilce-list.json`)
        dispatch(getLocationSuccess(data))
    } catch (error) {
        dispatch(getLocationFailure(error.message))
    }
}
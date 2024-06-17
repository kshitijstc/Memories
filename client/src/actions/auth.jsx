import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // Log in the user
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    alert("Invalid Credentials. Please enter correct username and password."); 
    console.log(error);
  }
}
export const signup = (formData, navigate) => async (dispatch) => {
    try {
      // sign up the user
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
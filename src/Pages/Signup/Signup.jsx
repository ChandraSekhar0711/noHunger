/* eslint-disable react/no-children-prop */

import { AuthAPI } from "@/api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/auth-slice";

import { useNavigate } from "react-router-dom";
//import { getAuth, RecaptchaVerifier } from "firebase/auth";

import SignUpForm from "@/forms/signupForm/SignUpForm";
import { sweetAlert } from "@/utils/sweetAlert";

export function Signup() {
  const showToast = sweetAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (formData, password) => {
    try {
      const user = await AuthAPI.signup(
        {
          ...formData,
          created_at: new Date().toLocaleDateString(),
        },
        password
      );
      console.log("user:", user);
      dispatch(setUser(user));
      showToast(
        "success",
        "Account has been created successfully. Verification link has been sent to registered email"
      );
      navigate("/Signin");
    } catch (error) {
      console.log("auth fauiled", error);
      showToast("error", "Invalid Credentials");
    }
  };
  return <SignUpForm onSubmit={submit} />;
}

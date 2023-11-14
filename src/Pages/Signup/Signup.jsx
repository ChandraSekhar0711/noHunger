/* eslint-disable react/no-children-prop */

import { AuthAPI } from "@/api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/auth-slice";
import { toast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
//import { getAuth, RecaptchaVerifier } from "firebase/auth";

import SignUpForm from "@/forms/signupForm/SignUpForm";

export function Signup() {
  const dispatch = useDispatch();

  //const [sentOtpStatus, setSentOtpStatus] = useState(false);
  //const [otp, setOtp] = useState("");
  //const [otpVerifyStatus, setOtpVerifyStatus] = useState(false);
  //const [captcha, setCaptcha] = useState("");
  //const [authCodeStatus, setAuthCodeStatus] = useState(null);
  const navigate = useNavigate();
  const submit = async (formData, password) => {
    //console.log(formData);
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
      await toast(
        "success",
        "Account has been created successfully. Verification link has been sent to registered email"
      );
      navigate("/Signin");
    } catch (error) {
      console.log("auth fauiled", error);
      toast("error", "Invalid Credentials");
    }
  };

  // const sendOTP = async (e) => {
  //   e.preventDefault();
  //   const captchaStatus = new RecaptchaVerifier(
  //     auth,
  //     "recaptcha-container", // Make sure this matches the ID of your HTML container
  //     {
  //       size: "invisible",
  //       callback: (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         console.log("reCAPTCHA response:", response);
  //       },
  //       "expired-callback": () => {
  //         // Handle expired reCAPTCHA, if needed
  //         console.log("reCAPTCHA expired");
  //       },
  //     }
  //   );
  //   setCaptcha(captchaStatus);
  //   if (captcha) {
  //     try {
  //       console.log(captcha);

  //       const authCode = await AuthAPI.phoneVerification(
  //         `+91${mobile}`,
  //         captcha
  //       );
  //       setSentOtpStatus(true);
  //       toast("success", "OTP sent");
  //       setAuthCodeStatus(authCode);
  //       console.log("AuthCode : ", authCode.verificationId);

  //       // const otp = "123456";
  //     } catch (error) {
  //       toast("error", error);
  //       console.log("Unable to send OTP");
  //     }
  //   }
  // };
  // const handlePinChange = (event) => {
  //   const { value } = event.target;
  //   setOtp((prevOtp) => prevOtp + value);
  //   // No need to log 'otp' here, as it might not reflect the latest state

  //   // Log 'otp' in a useEffect to ensure you get the updated value
  // };

  // useEffect(() => {
  //   console.log(otp);
  // }, [otp]);
  // const verifyOTP = async (e) => {
  //   e.preventDefault();

  //   if (await authCodeStatus.confirm(otp)) {
  //     console.log("otp verified");
  //     setOtpVerifyStatus(true);
  //     toast("success", "OTP verified");
  //   } else {
  //     toast("error", "Invalid OTP");
  //   }
  // };
  return <SignUpForm onSubmit={submit} />;
}

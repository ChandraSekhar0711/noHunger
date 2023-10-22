// import { store } from "@/store";
// import { getAuth, sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function withAuthRequired(Component) {
  return function ProtectedComponent() {
    const navigate = useNavigate();
    const user = useSelector((store) => store.authSlice.auth.user);
    // sendEmailVerification(auth.currentUser)
    //   .then(() => {
    //     // Email verification link sent
    //     console.log("Email sent");
    //   })
    //   .catch((error) => {
    //     // Handle errors (e.g., user not signed in, network issues, etc.)
    //     console.error("Error sending email verification:", error);
    //   });
    useEffect(() => {
      if (!user) {
        navigate("/Signin");
      }
    }, [user]);
    return user && <Component />;
  };
}

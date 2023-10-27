import { FirebaseApp } from "@/Services/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
export class AuthAPI {
  //Signin user
  static async signin(email, password) {
    const response = await signInWithEmailAndPassword(
      FirebaseApp.auth,
      email,
      password
    );
    //console.log(response.user.toJSON().emailVerified);
    return response.user.toJSON();
  }
  //signup user
  static async signup(email, password, displayName, mobile) {
    const response = await createUserWithEmailAndPassword(
      FirebaseApp.auth,
      email,
      password
    );
    const user = response.user;
    console.log("mobile",mobile )
    await updateProfile(user, {
      //displayName: displayName,
      phoneNumber: mobile,
    });

    await sendEmailVerification(user);
    return response.user.toJSON;
  }

  //signout user
  static async signOut() {
    signOut(FirebaseApp.auth);
  }

  //reset password
  static async resetPassword(email) {
    console.log("email:", email);
    await sendPasswordResetEmail(FirebaseApp.auth, email);
  }

  //mobile verification
  static async phoneVerification(mobile, captcha) {
    const response = await signInWithPhoneNumber(
      FirebaseApp.auth,
      mobile,
      captcha
    );
    console.log("otp sent");
    return response;
  }
}

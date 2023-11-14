import { FirebaseApp } from "@/Services/Firebase";
import { toast } from "@/utils/toast";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export class AuthAPI {
  /************************** fetchUser ***********************************************/
  static async fetchUser(userId) {
    const q = query(
      collection(FirebaseApp.db, "users"),
      where("uid", "==", userId)
    );

    try {
      const response = await getDocs(q);

      // Initialize the user variable outside the map loop
      let fetchedUser = null;

      response.docs.forEach((document) => {
        // If the user with the provided UID is found, store it in fetchedUser
        const userData = document.data();
        if (userData.uid === userId) {
          fetchedUser = { id: document.id, ...userData };
        }
      });

      // Return the fetched user or null if not found
      return fetchedUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // Return null or handle the error as needed
    }
  }
  /************************** createUser ***********************************************/
  static async createUser(formData) {
    //console.log(formData);
    const response = await addDoc(
      collection(FirebaseApp.db, "users"),
      formData
    );
    //console.log("response:", { id: response.id, ...formData });
    toast("success", "user is created");
    return { id: response.id, ...formData };
  }
  /************************** signin ***********************************************/
  static async signin(email, password) {
    const response = await signInWithEmailAndPassword(
      FirebaseApp.auth,
      email,
      password
    );
    //await this.fetchUser(response.user.toJSON().uid);
    //console.log(response.user.toJSON().uid);
    return response.user.toJSON();
  }
  /************************** SignUp ***********************************************/
  static async signup(formData, password) {
    const response = await createUserWithEmailAndPassword(
      FirebaseApp.auth,
      formData.email,
      password
    );
    const user = response.user;
    //console.log(user);
    await updateProfile(user, {
      displayName: formData.displayName,
    });

    await sendEmailVerification(user);

    const userCreated = await this.createUser({ ...formData, uid: user.uid });
    //console.log("userCreated:", userCreated);
    return userCreated;
  }

  /************************** signOut ***********************************************/
  static async signOut() {
    signOut(FirebaseApp.auth);
  }

  /************************** resetPassword ***********************************************/
  static async resetPassword(email) {
    console.log("email:", email);
    await sendPasswordResetEmail(FirebaseApp.auth, email);
  }

  /************************** phoneVerification ***********************************************/
  static async phoneVerification(mobile, captcha) {
    const response = await signInWithPhoneNumber(
      FirebaseApp.auth,
      mobile,
      captcha
    );
    console.log("otp sent");
    return response;
  }

  static async googleSignin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const signedUser = result.user;

      const formData = {
        displayName: signedUser.displayName,
        email: signedUser.email,
        uid: signedUser.uid,
        firstname: "",
        lastname: "",
        photoUrl: signedUser.photoURL,
        mobile: "",
      };

      const userCreated = await this.createUser({
        ...formData,
        created_at: new Date().toLocaleDateString(),
      });

      console.log("userCreated:", userCreated);
      return userCreated; // Return the signed-in user info
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  }
}

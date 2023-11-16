import { FirebaseApp } from "@/Services/Firebase";
import { toast } from "@/utils/toast";
import {
  signInWithEmailAndPassword,
  signOut as signOutAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export class AuthAPI {
  static async fetchUser(userId) {
    const q = query(collection(FirebaseApp.db, "users"), where("uid", "==", userId));

    try {
      const response = await getDocs(q);

      let fetchedUser = null;

      response.docs.forEach((document) => {
        const userData = document.data();
        if (userData.uid === userId) {
          fetchedUser = { id: document.id, ...userData };
        }
      });

      return fetchedUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  static async createUser(formData) {
    const response = await addDoc(collection(FirebaseApp.db, "users"), formData);
    console.log("userCreated");
    toast("success", "user is created");
    return { id: response.id, ...formData };
  }

  static async signin(email, password) {
    const response = await signInWithEmailAndPassword(FirebaseApp.auth, email, password);
    return response.user.toJSON();
  }

  static async signup(formData, password) {
    const response = await createUserWithEmailAndPassword(FirebaseApp.auth, formData.email, password);
    const user = response.user;

    await updateProfile(user, { displayName: formData.displayName });
    await sendEmailVerification(user);

    const userCreated = await this.createUser({ ...formData, uid: user.uid });
    return userCreated;
  }

  static async signOut() {
    signOutAuth(FirebaseApp.auth);
  }

  static async resetPassword(email) {
    await sendPasswordResetEmail(FirebaseApp.auth, email);
  }

  static async phoneVerification(mobile, captcha) {
    const response = await signInWithPhoneNumber(FirebaseApp.auth, mobile, captcha);
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

      const userExists = await this.fetchUser(signedUser.uid)
      if(!userExists){
        const userCreated = await this.createUser({
          ...formData,
          created_at: new Date().toLocaleDateString(),
        });
        console.log("userCreated:", userCreated);
      return userCreated;
      } else {
        console.log("User already exists:", userExists);
        // You might want to handle the case where the user already exists
        // Maybe update some information or perform other actions
        return userExists;
      }
      

      
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  }
}

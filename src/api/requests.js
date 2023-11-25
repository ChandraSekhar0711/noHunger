import { FirebaseApp } from "@/Services/Firebase";
import { addDoc, collection, getDoc, getDocs, query } from "firebase/firestore";

export class RequestsApi{
  static async createRequest(formValues){
    const response= await addDoc(collection(FirebaseApp.db,"Requests"),formValues);
    return {
      id: response.id,
      ...formValues,
    }
  }
  static async fetchRequests(){
    const q = await query(collection(FirebaseApp.db,"Requests"))
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }
}
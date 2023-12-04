import { FirebaseApp } from "@/Services/Firebase";
import { addDoc, collection, getDoc, getDocs, orderBy, query } from "firebase/firestore";

export class RequestsApi{
  static async createRequest(formValues){
    const response= await addDoc(collection(FirebaseApp.db,"Requests"),formValues);
    return {
      id: response.id,
      ...formValues,
    }
  }
  static async fetchRequests(){
    const q = await query(collection(FirebaseApp.db,"Requests"),orderBy("created_at","asc"))
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }
}
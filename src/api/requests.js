import { FirebaseApp } from "@/Services/Firebase";
import { Timestamp, addDoc, collection, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where, writeBatch } from "firebase/firestore";

export class RequestsApi{
  
  static async createRequest(formValues){
    console.log("old formvalues:",formValues);
    const values = {...formValues,
      createdAt: serverTimestamp(),
      expiryAt: Timestamp.fromDate(new Date(Date.now() + 60 * 60 * 1000))
    }
    console.log("new formvalues:",values);
    const response= await addDoc(collection(FirebaseApp.db,"Requests"),values);
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

  static async deleteExpiredRequests() {
    const now = Timestamp.now();
    console.log("now:", now);
    const q = query(collection(FirebaseApp.db, "Requests"), where('expiryAt', '<=', now));
    const snapshot = await getDocs(q);
    console.log("snapshot:", snapshot);
    const batch = writeBatch(FirebaseApp.db);
    snapshot.docs.forEach(doc => {
      console.log("doc.ref",doc.ref);
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  static onShouldSyncNotes(onChange) {
    const q = query(collection(FirebaseApp.db, "Requests"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      //console.log("you are not synced with the notes collection");
      !isUserPerformingChange && onChange();
    });
    return unSub;
  }

}
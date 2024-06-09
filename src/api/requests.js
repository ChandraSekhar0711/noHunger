import { FirebaseApp } from "@/Services/Firebase";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore";

export class RequestsApi {

  static async createRequest(formValues) {
    const requestId = uuidv4();
    console.log("requestId:", requestId);
    //console.log("old formvalues:",formValues);
    const values = {
      ...formValues,
      createdAt: serverTimestamp(),
      expiryAt: Timestamp.fromDate(new Date(Date.now() + 60 * 60 * 1000))
    }
    //console.log("new formvalues:",values);
    // const response= await addDoc(collection(FirebaseApp.db,"Requests",requestId),values);
    // console.log("Request added to global collection with ID: ", requestId);
    // const response1= await addDoc(collection(FirebaseApp.db,`users/${values.userCollectionId}/Requests`,requestId),values);
    // console.log("Request added to user's subcollection with ID: ", requestId);
    // Add request to the global Requests collection with a specific ID
    const requestRef = doc(FirebaseApp.db, "Requests", requestId);
    await setDoc(requestRef, values);
    console.log("Request added to global collection with ID: ", requestId);

    // Add request to the user's subcollection with the same ID
    const userRequestRef = doc(FirebaseApp.db, `users/${values.userCollectionId}/Requests`, requestId);
    await setDoc(userRequestRef, values);
    console.log("Request added to user's subcollection with ID: ", requestId);
    return {
      id: requestId,
      ...values,
    }
  }
  static async fetchRequests() {
    const q = await query(collection(FirebaseApp.db, "Requests"), orderBy("created_at", "asc"))
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }

  static async deleteExpiredRequests(userCollectionId) {
    const now = Timestamp.now();
    //console.log("now:", now);
    const q = query(collection(FirebaseApp.db, `users/${userCollectionId}/Requests`), where('expiryAt', '<=', now));
    const snapshot = await getDocs(q);
    console.log("Number of expired requests:", snapshot.docs.length);
    const batch = writeBatch(FirebaseApp.db);
    snapshot.docs.forEach(async docSnapshot => {
      const requestId = docSnapshot.id;
      console.log("Expired Request ID:", requestId);
      console.log("User subcollection document path:", docSnapshot.ref.path);
      // Delete from user's subcollection
      batch.delete(docSnapshot.ref);


      try {
        // Query the global Requests collection for the matching request ID
        console.log("fetching from global collection");
        await deleteDoc(doc(FirebaseApp.db, "Requests", requestId));
        console.log("deleted from global collection:",requestId);
        // Delete from user's subcollection
        
      } catch (error) {
        console.log("Error deleting from global collection:", error);
      }



    });
    await batch.commit();
    //console.log("now1:", now);
    return now;
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
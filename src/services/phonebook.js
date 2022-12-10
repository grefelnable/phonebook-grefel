import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const phonebookCollectionRef = collection(db, "phonebook");

const getAllContacts = () => {
  return getDocs(phonebookCollectionRef);
};

export default {
  getAllContacts,
};

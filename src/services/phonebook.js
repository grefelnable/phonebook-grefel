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
// Get All Contacts
const getAllContacts = () => {
  return getDocs(phonebookCollectionRef);
};
// Add new Contact
const addContact = (newContact) => {
  return addDoc(phonebookCollectionRef, newContact);
};
export default {
  getAllContacts,
  addContact,
};

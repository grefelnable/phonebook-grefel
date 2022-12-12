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
// Delete Contact
const deleteContact = (id) => {
  // variable to check if the particular contact exists.
  const contactDoc = doc(db, "phonebook", id);
  return deleteDoc(contactDoc);
};

// Update Contact
const updateContact = (id, updatedContact) => {
  // variable to check if the particular contact exists.
  const contactDoc = doc(db, "phonebook", id);
  return updateDoc(contactDoc, updatedContact);
};

// Get specific contact
const getContact = (id) => {
  const contactDoc = doc(db, "phonebook", id);
  return getDoc(contactDoc);
};

export default {
  getAllContacts,
  addContact,
  deleteContact,
  updateContact,
  getContact,
};

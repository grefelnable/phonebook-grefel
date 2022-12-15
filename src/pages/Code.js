import { useEffect } from "react";
import Prism from "prismjs";

const Code = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <section>
      <h2 className="mb-8">Highlights of what's under the hood</h2>
      {/* App.js */}
      <div className="collapse max-w-4xl mb-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          I used react router to have multiple pages across the application.
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <pre>
            <code className="language-javascript">
              {`
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// rest of the import... //

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="phonebook" element={<PhoneBook />} />
          <Route path="code" element={<Code />} />
          <Route path="repo" element={<Repo />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;

  `}
            </code>
          </pre>
        </div>
      </div>
      {/* Phone book services via firebase */}
      <div className="collapse max-w-4xl mb-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          I used Firebase as a backend and below are the services to create,
          read, update and delete contacts.
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <pre>
            <code className="language-javascript">
              {`
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


  `}
            </code>
          </pre>
        </div>
      </div>
      {/* Add contact */}
      <div className="collapse max-w-4xl mb-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          Adding a contact and I use a React-Toastify library for important
          alerts.
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <pre>
            <code className="language-javascript">
              {`
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import phonebookServices from "../services/phonebook";

const AddContact = ({
  isModalOpen,
  setIsModalOpen,
  getContacts,
  contactId,
  setContactId,
  persons,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  // add Contact
  const addPerson = async (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    // Run error if fields are empty
    if (!newName || !newNumber) {
      toast.error("Please Fill Out Fields");
      return;
    }

    // Add or update Contact
    try {
      // Check if it's an update or new addition
      if (contactId !== undefined && contactId !== "") {
        await phonebookServices.updateContact(contactId, personObject);
        setContactId("");
        toast.success("Updated Successfully!");
      } else {
        // Check for duplicates
        if (
          persons.find((person) => person.name === personObject.name) ||
          persons.find(
            (person) =>
              person.name === personObject.name &&
              person.number === personObject.number
          )
        ) {
          return toast.error(\`\${newName} is already added to the phonebook.\`);
        }
        await phonebookServices.addContact(personObject);
        toast.success("Contact Added Successfully!");
      }
    } catch (err) {
      toast.error(\`\${err.message}\`);
    }

    setNewName("");
    setNewNumber("");
    setIsModalOpen(false);
    getContacts();
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  // Populate the form with the specific contact to be edited
  const editHandler = async () => {
    try {
      const docSnapshot = await phonebookServices.getContact(contactId);
      console.log("The record is", docSnapshot.data());
      setNewName(docSnapshot.data().name);
      setNewNumber(docSnapshot.data().number);
    } catch (err) {
      toast.error(\`\${err.message}\`);
    }
  };

  // Runs to edit contact
  useEffect(() => {
    console.log("The id here is: ", contactId);
    if (contactId !== undefined && contactId !== "") {
      editHandler();
    }
  }, [contactId]);
  return (
    <>
      <div className={\`modal \${isModalOpen === true ? "modal-open" : ""}\`}>
        <form onSubmit={addPerson} className="modal-box">
          <h3 className="font-bold text-lg mb-8">Add/Edit Contact</h3>
          <input
            value={newName}
            onChange={handleNameChange}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs mb-4"
          />
          <input
            value={newNumber}
            onChange={handleNumberChange}
            type="text"
            placeholder="Number"
            className="input input-bordered w-full max-w-xs mb-4"
          />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-secondary btn-sm block">
              add/edit
            </button>
            <button
              type="button"
              onClick={() => (
                setIsModalOpen(!isModalOpen), setNewName(""), setNewNumber("")
              )}
              className="btn btn-error btn-sm block"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddContact;

  `}
            </code>
          </pre>
        </div>
      </div>
      {/* Map contacts */}
      <div className="collapse max-w-4xl mb-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          I use map method to display a dynamic contact from firebase and sort
          them alphabetically.
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <pre>
            <code className="language-javascript">
              {`
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Filter from "./Filter";

const Contacts = ({
  persons,
  handlePopup,
  setIsModalOpen,
  isModalOpen,
  getContactId,
}) => {
  const [search, setSearch] = useState("");
  // Filter function
  const searchHandler = (event) => {
    let lowerCase = event.target.value.toLowerCase();
    setSearch(lowerCase);
  };
  // sort names from A to Z
  const sortedPersons = persons.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  // Filter Contacts
  const filteredContacts = sortedPersons.filter((person) => {
    if (search === "") {
      return person;
    } else {
      return person.name.toLowerCase().includes(search);
    }
  });
  return (
    <section className="w-full h-[calc(100vh-6rem)] bg-slate-200 p-6">
      <Filter searchHandler={searchHandler} />
      {filteredContacts.map((person) => {
        const firstLetter = person.name.substring(0, 1).toUpperCase();
        return (
          <div
            key={person.id}
            className="flex justify-between items-center border-b border-neutral-focus p-1"
          >
            {/* avatar and name */}
            <section className="flex gap-2 items-center">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>{firstLetter}</span>
                </div>
              </div>
              <div>
                <h5 className="text-base-200">{person.name}</h5>
              </div>
            </section>
            {/* number and edit buttons */}
            <div className="flex gap-1 items-center">
              <section>
                <p className="text-neutral-focus">+1 {person.number}</p>
              </section>
              <div className="flex gap-1">
                <button
                  className="btn btn-success btn-sm"
                  onClick={(e) => {
                    setIsModalOpen(!isModalOpen);
                    getContactId(person.id);
                  }}
                >
                  <BiEdit />
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={(e) => handlePopup(person.id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Contacts;


  `}
            </code>
          </pre>
        </div>
      </div>
      {/* Error.js */}
      <div className="collapse max-w-4xl mb-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          I also like to style the Error page for more user friendly.
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <pre>
            <code className="language-javascript">
              {`
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-8xl font-bold">404</h1>
          <p className="py-6">page not found</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;

  `}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Code;

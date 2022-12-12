import { useState, useEffect } from "react";
import phonebookServices from "../services/phonebook";
import AddContact from "../components/AddContact";
import Contacts from "../components/Contacts";
import Menu from "../components/Menu";

const TheApp = () => {
  const [persons, setPersons] = useState([]);
  // Modal for adding and editing contact
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Popup is user wants to delete
  const [popup, setPopup] = useState({ show: false, id: null });
  // id for editing contact
  const [contactId, setContactId] = useState("");

  //Popup show and hide
  const handlePopup = (id) => setPopup({ show: true, id });
  const handleCancel = () => setPopup({ show: false, id: null });
  // fetch all contacts from firebase
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const data = await phonebookServices.getAllContacts();
    setPersons(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  // Delete Contact
  const deleteHandler = async () => {
    await phonebookServices.deleteContact(popup.id);
    getContacts();
    setPopup({ show: false, id: null });
  };

  // Contact ID handler
  const getContactIdHandler = (id) => {
    console.log(`The id to be edited ${id}`);
    setContactId(id);
  };
  return (
    <main>
      <div className="md:flex">
        <Menu setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        <Contacts
          persons={persons}
          handlePopup={handlePopup}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          getContactId={getContactIdHandler}
        />
      </div>
      {/* Modal for adding or editing contact */}
      <AddContact
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getContacts={getContacts}
        contactId={contactId}
        setContactId={setContactId}
      />
      {/* popup if user wants to delete contact */}
      <div className={`modal ${popup.show ? "modal-open" : ""}`}>
        <div className="modal-box">
          <p className="py-4">Are you sure you want to delete?</p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={deleteHandler}>
              Ok
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TheApp;

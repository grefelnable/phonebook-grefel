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
    console.log("Searching", event.target.value);
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
    <section className="w-full h-[calc(100vh-6rem)] bg-neutral-content p-6">
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
                <h3 className="text-base-200">{person.name}</h3>
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

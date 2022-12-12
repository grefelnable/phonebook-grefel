import React from "react";

const Contacts = ({ persons }) => {
  // sort names from A to Z
  const sortedPersons = persons.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  return (
    <section className="w-full h-[calc(100vh-6rem)] bg-neutral-content p-6">
      <h1 className="text-2xl text-base-100 font-bold mb-4">All Contacts</h1>

      {sortedPersons.map((person) => {
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
            <section>
              <p className="text-neutral-focus">+1 {person.number}</p>
            </section>
          </div>
        );
      })}
    </section>
  );
};

export default Contacts;

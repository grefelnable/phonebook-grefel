import { useState } from "react";
import Menu from "../components/Menu";

const TheApp = () => {
  const [persons, setPersons] = useState([{ name: "Grefel Nable" }]);
  const [newName, setNewName] = useState("");
  return (
    <main>
      <div className="flex">
        {/* left menu */}
        <Menu />
        {/* mid menu */}
        <div>mid menu</div>
      </div>
    </main>
  );
};

export default TheApp;

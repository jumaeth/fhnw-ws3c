import './App.css'
import {useState} from "react";
import {Semester} from "../types/types.ts";
import {Link} from "react-router-dom";

function App() {
  localStorage.semester = JSON.stringify([]);
  const [semester, setSemester] = useState<Semester[]>(JSON.parse(localStorage.semester));

  function addSemester() {
    const names = [...semester, {name: "Neues Semester", modules: []}];
    setSemester(names)
    localStorage.semester = JSON.stringify(names);
    console.log(localStorage.semester)
  }

  return (
    <>
      <div>
        <div>
          {semester.map((sem, index) => (
            <button type="button" key={index}>{sem.name}</button>
          ))}
        </div>
        <button type="button" onClick={addSemester}>+</button>
      </div>
      <Link to="/semester">Semester</Link>
    </>
  )
}

export default App
